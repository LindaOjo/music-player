import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = ({ songs, currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo }) => {
    //Event Handler
    const playSongHandler = () => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    }

    const getTime = (time) => {
        return (
            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value}); /// adding "...songInfo" lets you keep the current Info and only update currentTime.
    }

    const skipTrackHandler = (direction) => {
        const directionValue = direction === 'skip-back' ? -1 : 1;
        let currentIndex = songs?.findIndex((song) => song?.id === currentSong?.id);
        songs[currentIndex].active = false;
        let newIndex = currentIndex + directionValue;

        if (newIndex < 0) {
            newIndex = songs.length - 1;
        } else if (newIndex >= songs.length){
            newIndex = 0;
        }

        setCurrentSong(songs[newIndex]);
        songs[newIndex].active = true;

        //stack overflow code that fixes error when changing songs
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
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                min={0}
                max={songInfo.duration}
                value={songInfo.currentTime}
                onChange={dragHandler}
                type="range"/>
                <p>{getTime(songInfo.duration)}</p>        
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" icon={faAngleLeft} size="2x" />
                <FontAwesomeIcon onClick={playSongHandler} className="play" icon={ isPlaying ? faPause : faPlay} size="2x" />
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" icon={faAngleRight} size="2x" />
            </div>
        </div>
    )
};

export default Player;