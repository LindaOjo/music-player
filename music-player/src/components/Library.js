import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, currentSong, setCurrentSong, audioRef, isPlaying, libraryStatus}) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            audioRef={audioRef}
            song={song}
            songs={songs}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
}; 0902000192

export default Library;
