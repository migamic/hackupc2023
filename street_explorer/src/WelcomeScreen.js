import React, { useState } from 'react';
import logo from './logo.svg';
import './WelcomeScreen.css';

function WelcomeScreen() {
    const [name, setName] = useState('');
    const [showName, setShowName] = useState(false);

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const pressToStartButton = (e) => {
        e.preventDefault();
        setShowName(true);
    };

    return (
        <div>
            {/* {showName && <h1>{name} 0</h1>} */}
            {!showName && (
                <div id="background">
                    <div className="welcome-screen">
                        <h1>Welcome to Guide Wars!</h1>
                        <button onClick={pressToStartButton}>Press to start</button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default WelcomeScreen;
