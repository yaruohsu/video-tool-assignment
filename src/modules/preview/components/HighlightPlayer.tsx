import { useRef, useEffect, useState, useCallback } from 'react';
import { Play, ChevronRight, ChevronLeft, Pause } from 'lucide-react';
import useVideoStore from '../../store/useVideoStore';
import Timeline from './Timeline';
import useTimelineStore from '../../store/useTimelineStore';
import useTranscriptStore from '../../store/useTranscriptStore';

interface TranscriptSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  isHighlighted: boolean;
}

const HighlightPlayer = () => {
  const { videoUrl } = useVideoStore();
  const {
    timelineData,
    currentTime,
    duration,
    isPlaying,
    togglePlayPause,
    seekTo,
    setCurrentTime,
    setDuration,
  } = useTimelineStore();

  const { highlightedSegments } = useTranscriptStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState<number>(-1);
  const isSeekingRef = useRef<boolean>(false); // 防止 seek 期間的重複處理

  const findCurrentHighlightIndex = useCallback(
    (time: number): number => {
      return highlightedSegments.findIndex(
        (segment) => time >= segment.startTime && time <= segment.endTime
      );
    },
    [highlightedSegments]
  );

  const findNearestHighlight = (time: number): TranscriptSegment | null => {
    if (highlightedSegments.length === 0) return null;

    let nearestSegment = highlightedSegments[0];
    let minDistance = Math.abs(time - nearestSegment.startTime);

    for (const segment of highlightedSegments) {
      const distance = Math.min(
        Math.abs(time - segment.startTime),
        Math.abs(time - segment.endTime)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestSegment = segment;
      }
    }

    return nearestSegment;
  };

  const jumpToHighlight = useCallback(
    (segment: TranscriptSegment) => {
      const index = highlightedSegments.indexOf(segment);
      isSeekingRef.current = true; // 標記正在 seek
      setCurrentHighlightIndex(index);
      seekTo(segment.startTime);

      setTimeout(() => {
        isSeekingRef.current = false;
      }, 100);
    },
    [highlightedSegments, seekTo]
  );

  const handleTimeUpdate = () => {
    if (videoRef.current && !isSeekingRef.current) {
      const newTime = videoRef.current.currentTime;
      setCurrentTime(newTime);

      if (highlightedSegments.length > 0) {
        const currentIndex = findCurrentHighlightIndex(newTime);

        if (currentIndex === -1) {
          if (isPlaying) {
            const nearestSegment = findNearestHighlight(newTime);
            if (nearestSegment) {
              jumpToHighlight(nearestSegment);
              return;
            }
          }
        } else {
          const currentSegment = highlightedSegments[currentIndex];

          if (newTime >= currentSegment.endTime - 0.3) {
            const nextIndex = currentIndex + 1;
            if (nextIndex < highlightedSegments.length) {
              jumpToHighlight(highlightedSegments[nextIndex]);
              return;
            } else {
              // no more highlights, pause the video
              if (isPlaying) {
                togglePlayPause();
                return;
              }
            }
          }

          if (currentIndex !== currentHighlightIndex) {
            setCurrentHighlightIndex(currentIndex);
          }
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (targetTime: number) => {
    if (highlightedSegments.length === 0) {
      seekTo(targetTime);
      return;
    }

    const targetIndex = findCurrentHighlightIndex(targetTime);

    if (targetIndex !== -1) {
      seekTo(targetTime);
      setCurrentHighlightIndex(targetIndex);
    } else {
      const nearestSegment = findNearestHighlight(targetTime);
      if (nearestSegment) {
        jumpToHighlight(nearestSegment);
      }
    }
  };

  const handleTogglePlayPause = () => {
    if (highlightedSegments.length > 0) {
      const currentIndex = findCurrentHighlightIndex(currentTime);

      // if currentIndex not in highlight and video is paused, jump to first highlight
      if (currentIndex === -1 && !isPlaying) {
        jumpToHighlight(highlightedSegments[0]);
      }
    }

    togglePlayPause();
  };

  const handleSkipToNext = () => {
    if (highlightedSegments.length === 0) return;

    const nextIndex = currentHighlightIndex + 1;
    if (nextIndex < highlightedSegments.length) {
      jumpToHighlight(highlightedSegments[nextIndex]);
    } else {
      jumpToHighlight(highlightedSegments[0]);
    }
  };

  const handleSkipToPrevious = () => {
    if (highlightedSegments.length === 0) return;

    const prevIndex = currentHighlightIndex - 1;
    if (prevIndex >= 0) {
      jumpToHighlight(highlightedSegments[prevIndex]);
    } else {
      const lastIndex = highlightedSegments.length - 1;
      jumpToHighlight(highlightedSegments[lastIndex]);
    }
  };

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

  useEffect(() => {
    // handle highlightedSegments change
    if (highlightedSegments.length > 0 && isPlaying && !isSeekingRef.current) {
      const currentIndex = findCurrentHighlightIndex(currentTime);
      if (currentIndex === -1) {
        jumpToHighlight(highlightedSegments[0]);
      }
    }
  }, [currentTime, findCurrentHighlightIndex, highlightedSegments, isPlaying, jumpToHighlight]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getCurrentHighlight = (): TranscriptSegment | null => {
    return currentHighlightIndex !== -1 && highlightedSegments[currentHighlightIndex]
      ? highlightedSegments[currentHighlightIndex]
      : null;
  };

  if (!videoUrl) return null;

  const currentHighlight = getCurrentHighlight();

  return (
    <>
      <div className="video-container">
        <div className="video-wrapper relative">
          <video
            ref={videoRef}
            src={videoUrl}
            className="video-screen"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />

          {/* Text Overlay */}
          {currentHighlight && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 backdrop-blur-sm">
              <div className="max-w-full">
                <p className="text-sm md:text-base leading-relaxed text-center">
                  {currentHighlight.text}
                </p>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-300">
                  <span>
                    Highlight {currentHighlightIndex + 1} of {highlightedSegments.length}
                  </span>
                  <span>
                    {formatTime(currentHighlight.startTime)} -{' '}
                    {formatTime(currentHighlight.endTime)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="control-panel">
        <div className="control-content">
          <div className="control-buttons">
            <button className="control-btn" onClick={handleSkipToPrevious}>
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button className="play-btn" onClick={handleTogglePlayPause}>
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>
            <button className="control-btn" onClick={handleSkipToNext}>
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
              highlightedSegments={highlightedSegments}
              onSeek={handleSeek}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HighlightPlayer;
