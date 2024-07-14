import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { IconButton, Slider } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SettingsIcon from '@mui/icons-material/Settings';
import ReplayIcon from '@mui/icons-material/Replay';

const CustomVideoPlayer = ({ videoInfo }) => {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hovering, setHovering] = useState(false);
    const [showSkipButton, setShowSkipButton] = useState(false);
    const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [tempPlayed, setTempPlayed] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
            );
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
        document.addEventListener('mozfullscreenchange', handleFullScreenChange);
        document.addEventListener('MSFullscreenChange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
        };
    }, []);

    const handlePlayPause = () => {
        setPlaying(!playing);
        if (!hasStartedPlaying) {
            setHasStartedPlaying(true);
        }
    };

    const handleProgress = (state) => {
        setPlayed(state.playedSeconds);

        if (!isSeeking) {
            setSliderValue((state.playedSeconds / duration) * 100);
        }
        const { intro, outro } = videoInfo;
        if (intro && intro.start !== undefined && intro.end !== undefined) {
            if (state.playedSeconds >= intro.start && state.playedSeconds <= intro.end) {
                setShowSkipButton(true);
            } else {
                setShowSkipButton(false);
            }
        }

        if (state.playedSeconds == duration) {
            setPlaying(false);
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
        const playerContainer = document.getElementById("player-container");
        if (playerContainer) {
            if (isFullScreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (playerContainer.requestFullscreen) {
                    playerContainer.requestFullscreen();
                } else if (playerContainer.webkitRequestFullscreen) {
                    playerContainer.webkitRequestFullscreen();
                } else if (playerContainer.mozRequestFullScreen) {
                    playerContainer.mozRequestFullScreen();
                } else if (playerContainer.msRequestFullscreen) {
                    playerContainer.msRequestFullscreen();
                }
            }
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div id="player-container" className={`w-full h-full relative ${isFullScreen ? 'fullscreen' : ''}`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            {!hasStartedPlaying && (
                <div className="bg-primary w-full aspect-video justify-center flex">
                    <button onClick={handlePlayPause} className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="bg-transparent size-20 fill-secondary hover:fill-contrast">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}
            {hasStartedPlaying && (
                <>
                    <div onClick={handlePlayPause} style={{ width: '100%', height: '100%' }}>
                        <ReactPlayer
                            ref={playerRef}
                            url={videoInfo.url}
                            playing={playing}
                            onProgress={handleProgress}
                            onDuration={handleDuration}
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <div className={`absolute w-full bottom-0 flex flex-col justify-between items-center bg-gradient-to-t from-primary to-transparent transition-opacity duration-300 ${hovering ? 'opacity-100' : 'opacity-0'} ${isFullScreen ? 'fullscreen-controls' : ''}`}>
                        {showSkipButton && (
                            <div className="absolute bottom-20 right-0 m-5">
                                <button onClick={handleSkipIntro} className="text-white font-bold uppercase outline outline-1 p-2">
                                    Intro überspringen
                                </button>
                            </div>
                        )}
                        <div className='flex flex-col w-full pb-5 gap-2'>
                            <div className='flex w-full justify-between px-4'>
                                <div className='flex gap-5'>
                                    <IconButton onClick={handlePlayPause} sx={{ color: 'white', padding: 0, margin: 0 }}>
                                        {played == duration ? <ReplayIcon /> : playing ? <PauseIcon /> : <PlayArrowIcon />}
                                    </IconButton>

                                    <IconButton onClick={handleSkipIntro} sx={{ color: 'white', padding: 0, margin: 0 }}>
                                        <SkipNextIcon />
                                    </IconButton>

                                    <IconButton onClick={handleFullScreen} sx={{ color: 'white', padding: 0, margin: 0 }}>
                                        <VolumeUpIcon />
                                    </IconButton>
                                </div>
                                <div className='flex gap-5'>
                                    <IconButton onClick={handleFullScreen} sx={{ color: 'white', padding: 0, margin: 0 }}>
                                        <SettingsIcon />
                                    </IconButton>

                                    <IconButton onClick={handleFullScreen} sx={{ color: 'white', padding: 0, margin: 0 }}>
                                        {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                                    </IconButton>
                                </div>
                            </div>
                            <div className='flex gap-10 items-center px-5'>
                                <div className="text-white whitespace-nowrap text-sm">
                                    {formatTime(isSeeking ? tempPlayed : played)}
                                </div>
                                <Slider
                                    size="small"
                                    value={sliderValue}
                                    onChange={(e, newValue) => {
                                        setIsSeeking(true);
                                        setSliderValue(newValue);
                                        const newTime = (newValue / 100) * duration;
                                        setTempPlayed(newTime);
                                    }}
                                    onChangeCommitted={(e, newValue) => {
                                        setIsSeeking(false);
                                        const newTime = (newValue / 100) * duration;
                                        playerRef.current.seekTo(newTime, 'seconds');
                                        setPlayed(newTime);
                                    }}
                                    color='white'
                                />
                                <div className="text-white whitespace-nowrap text-sm">
                                    {formatTime(duration)}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CustomVideoPlayer;