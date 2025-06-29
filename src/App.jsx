import React, { useState, useEffect } from 'react';
import './App.css';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

const mascots = ['🖼️', '💾', '🖱️', '🗔', '🖥️', '⌨️', '🖨️', '📁', '📂', '🗃️'];
function getRandomMascot() {
  return mascots[Math.floor(Math.random() * mascots.length)];
}

function getRandomSpeech() {
  const lines = [
    "Welcome to GifMaker 3.1!",
    "Insert your floppy... just kidding!",
    "Let's make a GIF, retro style!",
    "Your memes, now with nostalgia!",
    "Drag and drop like it's 1992!",
    "Ready to pixelate your memories!",
    "Converting videos, please wait...",
    "All your GIFs are belong to us!",
    "It's fun to stay at the C:\\!",
    "Have you tried turning it off and on again?"
  ];
  return lines[Math.floor(Math.random() * lines.length)];
}

function playWin31Sound() {
  const audio = new window.Audio('/win31-startup.mp3');
  audio.volume = 0.5;
  audio.play();
}

function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [mascot, setMascot] = useState(getRandomMascot());
  const [speech, setSpeech] = useState(getRandomSpeech());

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const handleFileChange = (e) => {
    setVideo(e.target.files?.item(0));
    setMascot(getRandomMascot());
    setSpeech(getRandomSpeech());
    setGif(undefined);
  };

  const convertToGif = async () => {
    setSpeech("Converting... Please wait ☺");
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));
    await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');
    const data = ffmpeg.FS('readFile', 'out.gif');
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    setGif(url);
    setSpeech("Conversion complete! Your GIF is ready.");
    setMascot(getRandomMascot());
    playWin31Sound();
  };

  return ready ? (
    <div className="App">
      <h1><span className="mascot" role="img" aria-label="mascot">{mascot}</span> GifMaker 3.1</h1>
      <div className="speech">{speech}</div>
      <p>Turn your favorite video moments into retro GIFs!<br /><span style={{fontSize:'0.95em',color:'#404040'}}>Now with Windows 3.1 vibes.</span></p>
      { video && <video
        controls
        width="250"
        src={URL.createObjectURL(video)}>
      </video>}
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <h3>Result</h3>
      <button onClick={convertToGif} disabled={!video}>Convert</button>
      { gif && <><div className="result-emoji">🗔</div><img src={gif} width="250" alt="Your GIF" /></>}
    </div>
  ) : (
    <p>Loading the magic... <span role="img" aria-label="hourglass">⌛</span></p>
  );
}

export default App;
