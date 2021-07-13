import React, { useRef, useState } from "react";

//Import Styles
import "./styles/app.scss";
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Import Data
import data from "./data";

function App() {
  //Ref
  const audioRef = useRef(null);
  //State
  const [songs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration || 0;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} 
           setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        timeUpdateHandler={timeUpdateHandler}
        songs={songs}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong?.audio}
      ></audio>
    </div>
  );
}

export default App;
