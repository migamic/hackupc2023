import osmnx as ox
import json
import requests
from geopy.distance import distance
import math

# Define the bounding box of the area to download
# north, south, east, west = 41.7935, 41.7722, 1.1090, 1.0849 # Artesa
north, south, east, west = 41.3912, 41.3734, 2.1880, 2.1625 # Gotic
data_name = 'gotic'

hor_dist = distance((north, west), (north,east)).km
ver_dist = distance((north,west), (south,west)).km

hor_stretch = 10 # Max value that horizontal values will take
ver_stretch = ver_dist * (hor_stretch/hor_dist) # Max value that vertical values will take


# Download the OpenStreetMap data for the bounding box
G = ox.graph_from_bbox(north, south, east, west, network_type='all')

# Add the latitude and longitude coordinates of each node as attributes
for node, data in G.nodes(data=True):
    data['x'] = float(data['x'])
    data['y'] = float(data['y'])

print("Nodes:")
for node in list(G.nodes(data=True))[0:5]:
    print(node)

print("\nAdjacency:")
for edge in list(G.edges(data=True))[0:5]:
    print(edge)

def invert_y(nodes):
    for n in nodes:
        n['y'] *= -1
        n['y'] += 100

def normalize_axis(data, axis, old_min, old_max, new_min=0, new_max=10):
    old_range = old_max - old_min
    new_range = new_max - new_min

    # Scale the axis of each data element to the given range
    for d in data:
        scaled_point = (d[axis] - old_min) / old_range
        d[axis] = scaled_point * new_range + new_min

    return data


new_nodes = []
for n in list(G.nodes(data=True))[:]:
    new_nodes.append({
        'id' : n[0],
        'x' : n[1]['x'],
        'y' : n[1]['y'],
        'degree' : n[1]['street_count'],
    })

invert_y(new_nodes)
normalize_axis(new_nodes, 'x', west, east, 0, hor_stretch)
normalize_axis(new_nodes, 'y', -north+100, -south+100, 0, ver_stretch)

def get_weight(road_type):
    weights = {
        'residential' : 3,
        'living_street' : 3,
        'trunk' : 10,
        'trunk_link' : 9,
        'primary' : 8,
        'primary_link' : 7,
        'secondary' : 6,
        'secondary_link' : 5,
        'tertiary' : 4,
        'tertiary_link' : 3,
        'pedestrian' : 3,
        'service' : 3,
        'footway' : 1,
        'path' : 1,
        'cycleway' : 1,
        'corridor' : 1,
        'steps' : 1
    }

    if type(road_type) == type([]):
        rt = road_type[0]
    else:
        rt = road_type

    if rt in weights:
        return weights[rt]
    else:
        print(f'Ignoring {road_type}')
        return 0


new_edges = []
for e in list(G.edges(data=True))[:]:
    if type(e[2]['highway']) == type([]) or e[2]['highway'] in {'footway', 'corridor', 'steps', 'cycleway'}:
        pass
    else:
        if 'name' in e[2]:
            new_edges.append({
                'source' : e[0],
                'target' : e[1],
                'weight' : get_weight(e[2]['highway']),
                'name' : e[2]['name']
            })
        else:
            new_edges.append({
                'source' : e[0],
                'target' : e[1],
                'weight' : get_weight(e[2]['highway']),
                'name' : ''
            })

def remove_unconnected_nodes(nodes, edges):
    # Create a set of all node IDs that are in any edge
    connected_node_ids = set(edge['source'] for edge in edges) | set(edge['target'] for edge in edges)

    # Remove any node that is not in the connected_node_ids set
    nodes[:] = [node for node in nodes if node['id'] in connected_node_ids]

print('Nodes length', len(new_nodes))
remove_unconnected_nodes(new_nodes, new_edges)
print('Nodes length', len(new_nodes))

# Create a dictionary to store the nodes and edges
graph_data = {"nodes": new_nodes, "edges": new_edges}

# Convert the dictionary to JSON format
json_data = json.dumps(graph_data, indent=4)

# Write the JSON data to a file
with open(f'{data_name}.json', "w") as json_file:
    json_file.write(json_data)


## Write edges in extended format

ext_edges = {}

for n in new_nodes:
    curr_id = n['id']
    for e in new_edges:
        # If the node is either in source or destination, add it
        if curr_id == e['source']:
            if curr_id in ext_edges:
                ext_edges[curr_id][e['target']] = {
                        'weight' : e['weight'],
                        'name' : e['name']
                    }
            else:
                ext_edges[curr_id] = {e['target'] : {
                        'weight' : e['weight'],
                        'name' : e['name']
                    }}
        elif curr_id == e['target']:
            if curr_id in ext_edges:
                ext_edges[curr_id][e['source']] = {
                        'weight' : e['weight'],
                        'name' : e['name']
                    }
            else:
                ext_edges[curr_id] = {e['source'] : {
                        'weight' : e['weight'],
                        'name' : e['name']
                    }}

def add_neighbours(new_nodes, ext_edges):
    for n in new_nodes:
        neighbours = list(set([i for i in ext_edges[n['id']]]))
        n['neighbours'] = neighbours

# Add the neighbours element to nodes
add_neighbours(new_nodes, ext_edges)

def compute_length(new_nodes, ext_edges):
    for source_id, edges in ext_edges.items():
        for dest_id, edge_data in edges.items():
            source_node = next(node for node in new_nodes if node['id'] == source_id)
            dest_node = next(node for node in new_nodes if node['id'] == dest_id)
            dx = dest_node['x'] - source_node['x']
            dy = dest_node['y'] - source_node['y']
            edge_data['length'] = math.sqrt(dx*dx + dy*dy)

(new_nodes, ext_edges)

# Create a dictionary to store the nodes and edges
graph_data = {"nodes": new_nodes, "edges": ext_edges}

# Convert the dictionary to JSON format
json_data = json.dumps(graph_data, indent=4)

# Write the JSON data to a file
with open(f'ext_{data_name}.json', "w") as json_file:
    json_file.write(json_data)


## Parse POIs

# define the bounding box coordinates (in decimal degrees)
bbox = (south, west, north, east)

# Define the Overpass query
overpass_url = "http://overpass-api.de/api/interpreter"
overpass_query = f"""
    [out:json];
    (
        node["historic"="castle"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        way["historic"="castle"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        relation["historic"="castle"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        node["amenity"="place_of_worship"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        way["amenity"="place_of_worship"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        relation["amenity"="place_of_worship"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        node["amenity"="townhall"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        way["amenity"="townhall"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        relation["amenity"="townhall"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        node["historic"="monument"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        way["historic"="monument"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        relation["historic"="monument"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        node["building"="public"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        way["building"="public"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
        relation["building"="public"]({bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]});
    );
    out;
"""

# Send the Overpass query and get the results
response = requests.get(overpass_url, params={"data": overpass_query})
data = response.json()

POIs = []

def get_average_way(element):
    if 'nodes' in element:
        nodes = element['nodes']
    elif data['elements']:
        nodes = data['elements'][0]['nodes']
    else:
        return None
    latitudes = []
    longitudes = []
    for node in nodes:
        node_query = f"""
            [out:json];
            node({node});
            out;
            """
        response = requests.get(overpass_url, params={'data': node_query})
        node_data = response.json()
        if node_data['elements']:
            latitudes.append(node_data['elements'][0]['lat'])
            longitudes.append(node_data['elements'][0]['lon'])
    if latitudes and longitudes:
        centroid_lat = sum(latitudes) / len(latitudes)
        centroid_lon = sum(longitudes) / len(longitudes)
        return (centroid_lat, centroid_lon)
    return None

def get_average_relation(element):
    # Get outer way and return the average of its coordinates
    if 'members' in element:
        for m in element['members']:
            if m['type'] == 'way' and m['role'] == 'outer':
                w = m['ref']
                way_query = f"""
                    [out:json];
                    way({w});
                    out;
                    """
                response = requests.get(overpass_url, params={'data': way_query})
                way_data = response.json()
                return get_average_way(way_data)

    return None

def get_wikipedia_name(title):
    if title.startswith("ca:"):
        return title[3:]
    else:
        return title


# Print the name and type of each result
for element in data['elements']:
    try:
        poi = {}
        if element['type'] == 'node':
            poi['id'] = element['id']
            poi['x'] = element['lon']
            poi['y'] = element['lat']
            if 'tags' in element and 'name' in element['tags']:
                poi['name'] = element['tags']['name']
                POIs.append(poi)
            else:
                if 'tags' in element and 'wikipedia' in element['tags']:
                    poi['name'] = get_wikipedia_name(element['tags']['wikipedia'])
                    POIs.append(poi)
                else:
                    poi['name'] = ''
            POIs.append(poi)
        elif element['type'] == 'way':
            pass
            poi['id'] = element['id']
            poi['y'], poi['x'] = get_average_way(element)
            if 'tags' in element and 'name' in element['tags']:
                poi['name'] = element['tags']['name']
                POIs.append(poi)
            else:
                if 'tags' in element and 'wikipedia' in element['tags']:
                    poi['name'] = get_wikipedia_name(element['tags']['wikipedia'])
                    POIs.append(poi)
                else:
                    poi['name'] = ''
        elif element['type'] == 'relation':
            pass
            poi['id'] = element['id']
            poi['y'], poi['x'] = get_average_relation(element)
            if 'tags' in element and 'name' in element['tags']:
                poi['name'] = element['tags']['name']
                POIs.append(poi)
            else:
                if 'tags' in element and 'wikipedia' in element['tags']:
                    poi['name'] = get_wikipedia_name(element['tags']['wikipedia'])
                    POIs.append(poi)
                else:
                    poi['name'] = ''
        else:
            raise Exception('Unknown type')
    except:
        print('Ignoring element')
        print(element)


def add_nearest_nodes(POIs, nodes):
    for poi in POIs:
        min_dist = math.inf
        for node in nodes:
            dist = math.sqrt((poi['x'] - node['x']) ** 2 + (poi['y'] - node['y']) ** 2)
            if dist < min_dist:
                min_dist = dist
                poi['nearest_node'] = node['id']



invert_y(POIs)
normalize_axis(POIs, 'x', west, east, 0, hor_stretch)
normalize_axis(POIs, 'y', -north+100, -south+100, 0, ver_stretch)
add_nearest_nodes(POIs, new_nodes)

# Convert the dictionary to JSON format
json_data = json.dumps({'POIs' : POIs}, indent=4)

# Write the JSON data to a file
with open(f'poi_{data_name}.json', "w") as json_file:
    json_file.write(json_data)
