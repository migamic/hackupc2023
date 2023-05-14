import React, { useState, useEffect } from 'react';
import './ControlButtons.css';

function ControlButtons(props) {
    const [direction, setDirection] = useState("none");

    const moveFunctionUp = () => {
        setDirection("UP");
        //console.log(direction);
    };

    const moveFunctionDown = () => {
        setDirection("DOWN");
        //console.log(direction);
    };

    const moveFunctionLeft = () => {
        setDirection("LEFT");
        //console.log(direction);
    };

    const moveFunctionRight = () => {
        setDirection("RIGHT");
        //console.log(direction);
    };

    useEffect(() => {
        props.onDirectionChange(direction);
    }, [direction, props]);

    return (
        <div className="control-buttons">

            <button id="UP" onClick={moveFunctionUp}> ⇧ </button>
            <button id="DOWN" onClick={moveFunctionDown}> ⇩ </button>
            <button id="LEFT" onClick={moveFunctionLeft}> ⇦ </button>
            <button id="RIGHT" onClick={moveFunctionRight}> ⇨ </button>
        </div>
    );
}

export default ControlButtons;
