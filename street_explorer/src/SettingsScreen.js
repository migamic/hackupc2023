import React, { useState } from 'react';
import './WelcomeScreen.css';

function SettingsScreen() {
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
                <div class="settings-screen">
                <h1 class="app-name">Settings</h1>
                <div className="setting">
                  <p className="setting-title">Language</p>
                  <div className="setting-content">
                    <div className="options">
                      <label><input type="radio" name="language" value="english" checked/> English</label><br />
                      <label><input type="radio" name="language" value="spanish" /> Spanish</label><br />
                      <label><input type="radio" name="language" value="french" /> French</label><br />
                    </div>
                  </div>
                </div>
                <div className="setting">
                  <p className="setting-title">Graphics</p>
                  <div className="setting-content">
                    <div className="options">
                      <label><input type="radio" name="graphics" value="low" /> Low</label><br />
                      <label><input type="radio" name="graphics" value="medium" checked/> Medium</label><br />
                      <label><input type="radio" name="graphics" value="high" /> High</label><br />
                    </div>
                  </div>
                </div>
                <div className="setting">
                  <p className="setting-title">Sound</p>
                  <div className="setting-content">
                    <input type="range" min="0" max="100" defaultValue="50" className="slider" />
                  </div>
                </div>
                </div>
                </div>

            )}
        </div>
    );
}

export default SettingsScreen;
