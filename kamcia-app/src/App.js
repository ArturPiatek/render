import { useEffect, useState } from 'react';
import './App.css';
import moremp3 from './assets/more.mp3';
import uuuuyeahmp3 from './assets/uuuuyeah.mp3';
import sexplmp4 from './assets/sexpl.mp4';

function App() {
  useEffect(() => {
    console.log('more.mp3 path:', moremp3);
    console.log('uuuuyeah.mp3 path:', uuuuyeahmp3);
  }, []);

  const [total, setTotal] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const interval = setInterval(createGlitter, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (total >= 225) {
      setShowWarning(true);
    }
  }, [total]);

  const pourShot = (amount) => {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => {
      btn.classList.add('pouring');
      setTimeout(() => btn.classList.remove('pouring'), 400);
    });

    const audio = new Audio(amount === 25 ? sexplmp4 : uuuuyeahmp3);
    audio.currentTime = 0;
    audio.play();

    setTotal(prev => prev + amount);
  };

  const createGlitter = () => {
    const glitter = document.createElement('div');
    glitter.className = 'glitter';
    glitter.style.left = Math.random() * 100 + 'vw';
    glitter.style.animationDuration = (2 + Math.random() * 3) + 's';
    glitter.style.opacity = Math.random();
    document.body.appendChild(glitter);
    setTimeout(() => glitter.remove(), 5000);
  };

  return (
    <div className="App">
      {showWarning && <div id="warningLabel">Zwolnij Kamilka!</div>}
      <h1>Jägermeister Time!</h1>
      <div id="counter">Łącznie nalano: {total} ml</div>
      <button className="button" onClick={() => pourShot(25)}>Nalej 25ml</button>
      <button className="button" onClick={() => pourShot(50)}>Nalej 50ml</button>
    </div>
  );
}

export default App;
