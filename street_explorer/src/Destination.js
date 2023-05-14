import React, { useState, useEffect } from 'react';
import './NavigationBar.css';
import poiData from './poi_gotic.json';

function Destination() {
    const [poiName, setPoiName] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        const poiList = poiData.POIs;
        const randomIndex = Math.floor(Math.random() * poiList.length);
        setPoiName(poiList[randomIndex].name);
    }, []);

    useEffect(() => {
        setScore(2);
    }, []);

    return (
        <div>
            <div className="dest-banner">
                <p>The next destination in the city tour is</p>
                <h1 className="dest-name">{poiName}</h1>
            </div>
            <div className="score-banner">
                <p>You currently have <strong>{score}</strong> people in your group</p>
            </div>
        </div>
    );  
}

export default Destination;
