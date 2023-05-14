import React, { useState, useEffect, useRef } from 'react';
import './WelcomeScreen.css';
import './NavigationBar.css';
import logo from './logo.png'

function NavigationBar() {
    const [isCreditsOpen, setCreditsOpen] = useState(false);
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [isCityListOpen, setCityListOpen] = useState(false);
    const [isAboutOpen, setAboutOpen] = useState(false);

    const divRef = useRef(null);

    const toggleCredits = () => {
        setCreditsOpen(!isCreditsOpen);
        setSettingsOpen(false);
        setCityListOpen(false);
    };
    const toggleSettings = () => {
        setSettingsOpen(!isSettingsOpen);
        setCreditsOpen(false);
        setCityListOpen(false);
    };
    const toggleCityList = () => {
        setCityListOpen(!isCityListOpen);
        setCreditsOpen(false);
        setSettingsOpen(false);
    };
    const toggleAbout = () => {
        setAboutOpen(!isAboutOpen);
        setCreditsOpen(false);
        setSettingsOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (divRef.current && !divRef.current.contains(event.target)) {
            setCreditsOpen(false);
            setSettingsOpen(false);
            setCityListOpen(false);
            setAboutOpen(false);
          }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, [divRef]);

    return (
        <div>
            <div className="nav-button" id="citylist-button">
                <button onClick={toggleCityList}> 📍 </button>
            </div>
            <div className="nav-button" id="settings-button">
                <button onClick={toggleSettings}> ⚙️ </button>
            </div>
            <div className="nav-button" id="about-button">
                <button onClick={toggleAbout}> ℹ️ </button>
            </div>
            <div className="nav-button" id="credits-button">
                <button onClick={toggleCredits}> ✏️ </button>
            </div>

            { isCityListOpen && <div >
                <div id="background">
                    <div className="citylist-screen" ref={divRef}>
                    <h1 className="app-name">Select a city</h1>
                    <ul className="city-list">
                      <li className="city-element">
                        <span className="city-name">Paris</span>
                        <span className="city-country">France</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Rome</span>
                        <span className="city-country">Italy</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Barcelona</span>
                        <span className="city-country">Spain</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Istanbul</span>
                        <span className="city-country">Turkey</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Vienna</span>
                        <span className="city-country">Austria</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Amsterdam</span>
                        <span className="city-country">Netherlands</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Berlin</span>
                        <span className="city-country">Germany</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Prague</span>
                        <span className="city-country">Czech Republic</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Lisbon</span>
                        <span className="city-country">Portugal</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Madrid</span>
                        <span className="city-country">Spain</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Athens</span>
                        <span className="city-country">Greece</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Venice</span>
                        <span className="city-country">Italy</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Dublin</span>
                        <span className="city-country">Ireland</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Zurich</span>
                        <span className="city-country">Switzerland</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Bangkok</span>
                        <span className="city-country">Thailand</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">London</span>
                        <span className="city-country">United Kingdom</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Dubai</span>
                        <span className="city-country">United Arab Emirates</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Singapore</span>
                        <span className="city-country">Singapore</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">New York City</span>
                        <span className="city-country">United States</span>
                      </li>
                      <li className="city-element">
                        <span className="city-name">Hong Kong</span>
                        <span className="city-country">China</span>
                      </li>
                    </ul>
                    </div>
                </div>
            </div>}

            { isSettingsOpen && <div >
                <div id="background">
                    <div className="settings-screen" ref={divRef}>
                        <h1 className="app-name">Settings</h1>
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
            </div>}
            
            { isAboutOpen && <div >
                <div id="background">
                    <div className="credits-screen" ref={divRef}>
                        <h1 className="app-name">About the game</h1>
                        <div className="about-text">
                          <p>Being a tourist guide is not an easy job! How does your knowledge of the city compare to others?</p>
                          <p>In order to become the greatest tour guide of them all, you need to stand out from the rest. And what better way to do it than by having the largest crowd of followers around?</p>
                          <p>You should first try to grab the attention of a few interested tourists, which should be easy enough near important landmarks. Your job as a guide starts there; afterwards, you should build a route along touristic spots in the city, where there will be plenty of other stray tourists eager to join your group and listen to your wonderful narratives.</p>
                          <p>But be careful! You are not the only guide in the city. You should avoid at all costs meeting with a group that is larger than yours, since that will make your followers realize there are better guides around and promptly switch groups.</p>
                          <p>However, if you meet with a smaller crowd, you are sure to gain a bunch of followers ;)</p>
                          <p>Keep in mind that tourists like visiting places but don't really enjoy walking to those places. So they will start leaving the group if you take too much time before reaching your next destination.</p>
                          <p>But once you finish your tour, you are sure to get an ovation from your enthusiastic crowd and maybe a few tips to lighten up your day. But most importantly, you will have improved your knowledge about the city!</p>
                        </div>
                    </div>
                </div>
            </div>}

            { isCreditsOpen && <div >
                <div id="background">
                    <div className="credits-screen" ref={divRef}>
                        <img className="img-logo" src={logo} alt="Logo" className="logo" />
                        <h1 className="app-name">Guide Wars</h1>
                        <div className="subtitle">
                          <p className="subtitle-text"><em>A HackUPC 2023 project</em></p>
                        </div>
                        <div className="credits">
                          <p className="credit-line"><a href="https://github.com/uteuliyeva"  target="_blank">Malika Uteuliyeva</a></p>
                          <p className="credit-line"><a href="https://github.com/migamic" target="_blank">Jaume Ros Alonso</a></p>
                          <p className="credit-line"><a href="https://github.com/eavraam" target="_blank">Evripidis Avraam</a></p>
                        </div>
                        <div className="copyright">
                          <p className="copyright-text">Map tiles © 2023 MapTiler, © OpenStreetMap contributors</p>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default NavigationBar;
