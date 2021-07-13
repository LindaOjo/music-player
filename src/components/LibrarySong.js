import React from 'react';

const LibrarySong = ({song, songs, currentSong, setCurrentSong, audioRef, isPlaying}) => {
    const songSelectHandler = () => {
        setCurrentSong(song);
        //Add Active State
        songs.forEach(s =>  s.id !== song.id ? s.active = false : s.active = true)

        if(isPlaying) {
            const playPromise = audioRef.current.play();
            if(playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                })
            }
        }
    }
    return(
        <div className={`library-song ${song.id === currentSong.id ? 'selected' : ""}`} onClick={songSelectHandler}>
            <img src={song?.cover} alt={song?.name}></img>
            <div className="song-description">
                <h3>{song?.name}</h3>
                <h4>{song?.artist} </h4>
            </div>

        </div>
    )
};

export default LibrarySong;