import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { IconButton, Slider } from '@mui/material';

const CustomVideoPlayer = ({ videoInfo }) => {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hovering, setHovering] = useState(false);
    const [showSkipButton, setShowSkipButton] = useState(false);
    const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

    const handlePlayPause = () => {
        setPlaying(!playing);
        if (!hasStartedPlaying) {
            setHasStartedPlaying(true);
        }
    };

    const handleProgress = (state) => {
        setPlayed(state.playedSeconds);
        const { intro, outro } = videoInfo;
        if (intro && intro.start !== undefined && intro.end !== undefined) {
            if (state.playedSeconds >= intro.start && state.playedSeconds <= intro.end) {
                setShowSkipButton(true);
            } else {
                setShowSkipButton(false);
            }
        }
    };

    const handleDuration = (duration) => {
        setDuration(duration);
    };

    const handleSkipIntro = () => {
        const { intro } = videoInfo;
        if (intro && intro.end !== undefined) {
            playerRef.current.seekTo(intro.end, 'seconds');
            setPlaying(true); // Start playing after skipping intro
            setShowSkipButton(false);
        }
    };

    const handleFullScreen = () => {
        const player = playerRef.current.getInternalPlayer();
        if (player) {
            if (player.requestFullscreen) {
                player.requestFullscreen();
            } else if (player.webkitRequestFullscreen) {
                player.webkitRequestFullscreen();
            } else if (player.mozRequestFullScreen) {
                player.mozRequestFullScreen();
            } else if (player.msRequestFullscreen) {
                player.msRequestFullscreen();
            }
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="w-full" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            {!hasStartedPlaying && (
                <div className="bg-black w-full aspect-video justify-center flex">
                    <button onClick={handlePlayPause}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-20 fill-neutral-200 hover:fill-neutral-50">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                        </svg>
                        
                        {
                        /*
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-20 fill-neutral-200 hover:fill-neutral-50">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                        </svg>
                        */
                        }
                    </button>
                </div>
            )}
            {hasStartedPlaying && (
                <>
                    <ReactPlayer
                        ref={playerRef}
                        url={videoInfo.url}
                        playing={playing}
                        onProgress={handleProgress}
                        onDuration={handleDuration}
                        width="100%"
                        height="100%"
                    />
                    <div className={`w-full bottom-0 flex justify-between items-center px-5 py-2 gap-3 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${hovering ? 'opacity-100' : 'opacity-0'}`}>
                        <IconButton onClick={handlePlayPause} sx={{ color: 'white', padding: 0, margin: 0 }}>
                            {playing ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        <Slider
                            size="small"
                            value={(played / duration) * 100 || 0}
                            onChange={(e, newValue) => {
                                const newTime = (newValue / 100) * duration;
                                playerRef.current.seekTo(newTime, 'seconds');
                            }}
                            sx={{ color: 'white' }}
                        />
                        <div className="text-white whitespace-nowrap">
                            {formatTime(played)} / {formatTime(duration)}
                        </div>
                        <IconButton onClick={handleFullScreen} sx={{ color: 'white' }}>
                            <FullscreenIcon />
                        </IconButton>
                    </div>
                    {showSkipButton && (
                        <div className="absolute right-0 m-5">
                            <button onClick={handleSkipIntro} className="text-white font-bold uppercase outline outline-1 p-2">
                                Intro überspringen
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CustomVideoPlayer;
