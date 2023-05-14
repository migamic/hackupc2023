import requests

def get_osm_coordinates(place_name):
    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_query = f"""
        [out:json];
        node["name"="{place_name}"];
        out;
        """
    response = requests.get(overpass_url,
                            params={'data': overpass_query})
    data = response.json()
    if data['elements']:
        latitude = data['elements'][0]['lat']
        longitude = data['elements'][0]['lon']
        return (latitude, longitude)
    else:
        overpass_query = f"""
            [out:json];
            way["name"="{place_name}"];
            out;
            """
        response = requests.get(overpass_url,
                                params={'data': overpass_query})
        data = response.json()
        if data['elements']:
            nodes = data['elements'][0]['nodes']
            latitudes = []
            longitudes = []
            for node in nodes:
                node_query = f"""
                    [out:json];
                    node({node});
                    out;
                    """
                response = requests.get(overpass_url,
                                        params={'data': node_query})
                node_data = response.json()
                if node_data['elements']:
                    latitudes.append(node_data['elements'][0]['lat'])
                    longitudes.append(node_data['elements'][0]['lon'])
            if latitudes and longitudes:
                centroid_lat = sum(latitudes) / len(latitudes)
                centroid_lon = sum(longitudes) / len(longitudes)
                return (centroid_lat, centroid_lon)
        return None

print(get_osm_coordinates('Sagrada Família'))
