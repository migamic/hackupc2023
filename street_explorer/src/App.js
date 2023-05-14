import React from 'react';
import { useState, useEffect } from "react";
import Map from './Map';
import graph_data from './gotic.json';
import poi_data from './poi_gotic.json';
import ext_data from './ext_gotic.json';
import ControlButtons from './ControlButtons';

function App() {

    const [direction, setDirection] = useState("none");

    const handleDirectionChange = (direction) => {
        //console.log("Direction changed:", direction);
        setDirection(direction);
    };


    return (
        <div style={{ backgroundColor: 'lightblue', overflow: 'hidden', position: 'relative'}}>
            <ControlButtons onDirectionChange={handleDirectionChange}/>
            <Map graph_data={graph_data} poi_data={poi_data} ext_data={ext_data} direction={direction}/>
        </div>
    );
}


export default App;