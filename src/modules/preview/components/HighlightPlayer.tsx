import { useRef, useState } from 'react';
import { Play, ChevronRight, ChevronLeft, Pause } from 'lucide-react';
import useVideoStore from '../../store/useVideoStore';

const HighlightPlayer = () => {
  const videoUrl = useVideoStore((state) => state.videoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        Math.max(videoRef.current.currentTime + seconds, 0),
        duration
      );
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.currentTime = time;
    setCurrentTime(time);
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
          <div className=" control-content ">
            <div className="control-buttons">
              <button className="control-btn" onClick={() => skip(-5)}>
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button className="play-btn" onClick={togglePlay}>
                {playing ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>

              <button className="control-btn" onClick={() => skip(5)}>
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
              <span className="flex-shrink-0 text-white text-sm md:text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="progress-container">
              <input
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full mt-2 h-1 bg-gray-300 rounded-lg cursor-pointer accent-blue-500"
              />
              {/* <span className="time-display">00:45</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '62%' }}>
                  <div className="progress-thumb"></div>
                </div>
                <div className="progress-markers">
                  <div className="progress-marker" style={{ left: '15%' }}></div>
                  <div className="progress-marker" style={{ left: '35%' }}></div>
                  <div className="progress-marker" style={{ left: '55%' }}></div>
                  <div className="progress-marker" style={{ left: '75%' }}></div>
                  <div className="progress-marker" style={{ left: '85%' }}></div>
                </div>
              </div>
              <span className="time-display">01:10</span> */}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default HighlightPlayer;
