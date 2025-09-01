import React, { useState, useRef, useCallback } from 'react';
import { type TimelineState } from '../../store/useTimelineStore';
import clsx from 'clsx';

interface TimelineProps {
  duration: number; // seconds
  currentTime: number;
  segments: TimelineState['timelineData'];
  onSeek: (time: number) => void;
}

const Timeline = ({ duration, currentTime, segments, onSeek }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTimelineClick = useCallback(
    (event: React.MouseEvent) => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = Math.max(0, Math.min(duration, percentage * duration));

      onSeek(newTime);
    },
    [duration, onSeek]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      setIsDragging(true);
      handleTimelineClick(event);
    },
    [handleTimelineClick]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!isDragging) return;
      handleTimelineClick(event);
    },
    [isDragging, handleTimelineClick]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="timeline-container">
      <div
        ref={timelineRef}
        className="timeline-bar"
        onClick={handleTimelineClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {segments.map((segment, index) => {
          const startPercentage = (segment.startTime / duration) * 100;
          const widthPercentage = (
            ((segment.endTime - segment.startTime) / duration) *
            100
          ).toFixed(2);
          return (
            <div
              key={index}
              className={clsx(
                'absolute top-0 h-full',
                segment.isHighlighted ? 'bg-primary-500' : 'bg-gray-400'
              )}
              style={{
                left: `${startPercentage}%`,
                width: `${widthPercentage}%`,
              }}
            />
          );
        })}

        <div className="timeline-thumb" style={{ left: `${progressPercentage}%` }} />
      </div>
    </div>
  );
};

export default Timeline;
