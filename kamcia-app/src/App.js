import { useEffect, useState, useRef } from 'react';
import './App.css';

import sexplmp4 from './assets/sexpl.mp4';
import yeahmp4 from './assets/yeah.mp4';
import ump4 from './assets/u.mp4';
import smiechmp4 from './assets/smiech.mp4';
import legiamp4 from './assets/legia.mp4';
import eymp4 from './assets/ey.mp4';

function App() {
  const [total, setTotal] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const sounds = useRef([]); // Holds the list of sounds to be played
  const playedSounds = useRef([]); // Holds sounds that have already been played

  // Shuffle the sounds when the component mounts
  useEffect(() => {
    sounds.current = shuffle([
      sexplmp4,
      yeahmp4,
      ump4,
      smiechmp4,
      legiamp4,
      eymp4,
    ]);
  }, []);

  const shuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get the next sound to play (ensuring no repetition until all are played)
  const getNextSound = () => {
    if (sounds.current.length === 0) {
      // Once all sounds have been played, reshuffle and reset the played sounds
      sounds.current = shuffle(playedSounds.current);
      playedSounds.current = [];
    }

    const next = sounds.current.pop();
    playedSounds.current.push(next);
    return next;
  };

  // Play the shot sound and trigger the button animation
  const pourShot = (amount, e) => {
    const button = e.currentTarget;
    button.classList.add('pouring');
    setTimeout(() => button.classList.remove('pouring'), 400);

    const randomSound = getNextSound();
    const audio = new Audio(randomSound);
    audio.currentTime = 0;
    audio.play();

    setTotal((prev) => prev + amount);
  };

  // Create glitter effect
  const createGlitter = () => {
    const glitter = document.createElement('div');
    glitter.className = 'glitter';
    glitter.style.left = Math.random() * 100 + 'vw';
    glitter.style.top = '50vh'; // Start from the middle of the screen
    glitter.style.animationDuration = (2 + Math.random() * 3) + 's';
    glitter.style.opacity = Math.random();
    document.body.appendChild(glitter);
    setTimeout(() => glitter.remove(), 5000);
  };

  // Use effect for glitter creation and warning display
  useEffect(() => {
    const interval = setInterval(createGlitter, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (total >= 225) {
      setShowWarning(true);
    }
  }, [total]);

  return (
    <div className="App">
      {showWarning && <div id="warningLabel">Zwolnij Kamilka!</div>}
      <h1>Jägermeister Time!</h1>
      <div id="counter">Łącznie nalano: {total} ml</div>
      <button className="button" onClick={(e) => pourShot(25, e)}>Nalej 25ml</button>
      <button className="button" onClick={(e) => pourShot(50, e)}>Nalej 50ml</button>
    </div>
  );
}

export default App;
