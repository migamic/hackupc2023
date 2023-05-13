import logo from './logo.svg';
import './WelcomeScreen.css';

function WelcomeScreen() {

    const pressToStartButton = (e) => {
        e.preventDefault();
        const overlay = document.querySelector(".welcome-screen");
        overlay.classList.add("hide"); // Hide overlay on button click
    };

    return (
        
        <div className="welcome-screen">
            <h1>Welcome!</h1>
            <button onClick={pressToStartButton}>Press to start.</button>
        </div>
        
    );
}


export default WelcomeScreen;