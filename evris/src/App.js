import React from 'react';
import { useState, useEffect } from "react";
import Map from './Map';
import graph_data from './agramunt.json';

function App() {



    

    // ---------------
    // Node - Edge traversal

    const [data, setData] = useState(null);
    const [selectedNodeId, setSelectedNodeId] = useState(312140524);

    useEffect(() => {
        async function fetchData() {
        const response = await fetch("./ext_agramunt.json");
        const parsedData = await response.json();
        setData(parsedData);
        }

        fetchData();
    }, []);

    useEffect(() => {
        function handleKeyPress(event) {
        if (event.code === "Space") {
            if (!selectedNodeId) {
            console.log("No node selected.");
            return;
            }

            const edges = data.edges[selectedNodeId];
            if (!edges) {
            console.log("No edges found for selected node.");
            return;
            }

            const connectedNodeIds = Object.keys(edges);
            const connectedNodes = data.nodes.filter(node =>
            connectedNodeIds.includes(node.id.toString())
            );
            console.log("Connected nodes:", connectedNodes);

            if (connectedNodes.length > 0) {
            const randomIndex = Math.floor(Math.random() * connectedNodes.length);
            const randomNode = connectedNodes[randomIndex];
            setSelectedNodeId(randomNode.id.toString());
            console.log("Selected node:", randomNode);
            }
        }
        }

        document.addEventListener("keypress", handleKeyPress);

        return () => {
        document.removeEventListener("keypress", handleKeyPress);
        };
    }, [data, selectedNodeId]);

    function handleNodeClick(nodeId) {
        setSelectedNodeId(nodeId.toString());
    }


    return (

        
        // ---------------
        // Map
        <div style={{ backgroundColor: 'lightblue', overflow: 'hidden'}}>
            <Map graph_data={graph_data}/>
            selectedNodeId={312140524}
        </div>  
    );
}


export default App;