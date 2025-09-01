import { useRef, useEffect } from 'react';
import { Play, ChevronRight, ChevronLeft, Pause } from 'lucide-react';
import useVideoStore from '../../store/useVideoStore';
import Timeline from './Timeline';
import useTimelineStore from '../../store/useTimelineStore';

const HighlightPlayer = () => {
  const { videoUrl } = useVideoStore();
  const {
    timelineData,
    currentTime,
    duration,
    isPlaying,
    togglePlayPause,
    seekTo,
    skipToNextHighlight,
    skipToPreviousHighlight,
    setCurrentTime,
    setDuration,
  } = useTimelineStore();

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current && Math.abs(videoRef.current.currentTime - currentTime) > 0.5) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  return (
    videoUrl && (
      <>
        <div className="video-container">
          <div className="video-wrapper">
            <video
              ref={videoRef}
              src={videoUrl}
              className="video-screen"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
          </div>
        </div>
        <div className="control-panel">
          <div className="control-content">
            <div className="control-buttons">
              <button className="control-btn" onClick={skipToPreviousHighlight}>
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button className="play-btn" onClick={togglePlayPause}>
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>

              <button className="control-btn" onClick={skipToNextHighlight}>
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
              <span className="flex-shrink-0 text-white text-sm md:text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="box-sizing: content-box;">
              <Timeline
                duration={duration}
                currentTime={currentTime}
                segments={timelineData}
                onSeek={seekTo}
              />
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default HighlightPlayer;
