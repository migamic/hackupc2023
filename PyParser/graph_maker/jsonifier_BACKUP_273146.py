<<<<<<< HEAD
import json # Define the node and edge data
=======
import json

# Define the node and edge data
>>>>>>> 38220fa3e73d7a1d8db57fa166aa5be095b9e890
nodes = [
    {"id": "0", "x": 6, "y": 4, "degree": "4"},
    {"id": "1", "x": 9, "y": 5, "degree": "2"},
    {"id": "2", "x": 7, "y": 8, "degree": "3"},
    {"id": "3", "x": 9, "y": 8, "degree": "3"},
    {"id": "4", "x": 6, "y": 1, "degree": "2"},
<<<<<<< HEAD
    {"id": "5", "x": 3, "y": 2, "degree": "2"},
=======
    {"id": "5", "x": 3, "y": 1, "degree": "2"},
>>>>>>> 38220fa3e73d7a1d8db57fa166aa5be095b9e890
    {"id": "6", "x": 12, "y": 7, "degree": "3"},
    {"id": "7", "x": 9, "y": 10, "degree": "2"},
    {"id": "8", "x": 12, "y": 10, "degree": "2"},
    {"id": "9", "x": 5, "y": 9, "degree": "1"}
]

edges = [
    {"source": "0", "target": "1", "weight": "5", "name": "Main Street"},
    {"source": "0", "target": "2", "weight": "3", "name": "North Avenue"},
    {"source": "0", "target": "4", "weight": "3", "name": "North Avenue"},
    {"source": "0", "target": "5", "weight": "5", "name": "Main Street"},
    {"source": "1", "target": "6", "weight": "5", "name": "Main Street"},
    {"source": "2", "target": "3", "weight": "2", "name": "Capybara Boulevard"},
    {"source": "2", "target": "9", "weight": "2", "name": "Capybara Boulevard"},
    {"source": "3", "target": "6", "weight": "2", "name": "Capybara Boulevard"},
    {"source": "3", "target": "7", "weight": "1", "name": "Oldtown Grove"},
    {"source": "4", "target": "5", "weight": "1", "name": "Windmill Path"},
    {"source": "6", "target": "8", "weight": "2", "name": "Hallows Road"},
    {"source": "7", "target": "8", "weight": "2", "name": "East Road"}
]

# Create a dictionary to store the nodes and edges
graph_data = {"nodes": nodes, "edges": edges}

# Convert the dictionary to JSON format
json_data = json.dumps(graph_data, indent=4)

# Write the JSON data to a file
with open("graph_data.json", "w") as json_file:
    json_file.write(json_data)

