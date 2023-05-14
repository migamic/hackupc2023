import json
import networkx as nx
import matplotlib.pyplot as plt

with open('graph_data.json') as f:
    data = json.load(f)

print(data)

G = nx.Graph()

for node in data['nodes']:
    G.add_node(node['id'])

pos = {node['id']: (node['x'], node['y']) for node in data['nodes']}
nx.set_node_attributes(G, pos, 'pos')

for edge in data['edges']:
    G.add_edge(edge['source'], edge['target'])

#nx.draw(G, pos=pos)
#plt.savefig('graph.png')
