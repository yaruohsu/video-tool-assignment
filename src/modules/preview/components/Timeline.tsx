import React, { useState, useRef, useCallback } from 'react';
import { type TimelineState } from '../../store/useTimelineStore';

interface TimelineProps {
  duration: number; // seconds
  currentTime: number;
  segments: TimelineState['timelineData'];
  highlightedSegments: TranscriptSegment[];
  onSeek: (time: number) => void;
}

interface TranscriptSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  isHighlighted: boolean;
}

const Timeline = ({
  duration,
  currentTime,
  segments,
  highlightedSegments,
  onSeek,
}: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const findNearestHighlightSegment = useCallback(
    (targetTime: number) => {
      if (highlightedSegments.length === 0) return null;

      const clickedSegment = highlightedSegments.find(
        (segment) => targetTime >= segment.startTime && targetTime <= segment.endTime
      );

      if (clickedSegment) {
        return { segment: clickedSegment, time: targetTime };
      }

      let nearestSegment = highlightedSegments[0];
      let minDistance = Math.abs(targetTime - nearestSegment.startTime);

      for (const segment of highlightedSegments) {
        const distanceToStart = Math.abs(targetTime - segment.startTime);
        const distanceToEnd = Math.abs(targetTime - segment.endTime);
        const minSegmentDistance = Math.min(distanceToStart, distanceToEnd);

        if (minSegmentDistance < minDistance) {
          minDistance = minSegmentDistance;
          nearestSegment = segment;
        }
      }

      const distanceToStart = Math.abs(targetTime - nearestSegment.startTime);
      const distanceToEnd = Math.abs(targetTime - nearestSegment.endTime);
      const seekTime =
        distanceToStart <= distanceToEnd ? nearestSegment.startTime : nearestSegment.endTime;

      return { segment: nearestSegment, time: seekTime };
    },
    [highlightedSegments]
  );

  const handleTimelineClick = useCallback(
    (event: React.MouseEvent) => {
      if (!timelineRef.current || highlightedSegments.length === 0) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const percentage = clickX / rect.width;
      const targetTime = Math.max(0, Math.min(duration, percentage * duration));

      const result = findNearestHighlightSegment(targetTime);
      if (result) {
        onSeek(result.time);
      }
    },
    [highlightedSegments.length, duration, findNearestHighlightSegment, onSeek]
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
          const startPercentage = (segment.startTime / duration) * 100 + 0.5;
          const widthPercentage = (
            ((segment.endTime - segment.startTime) / duration) * 100 -
            1
          ).toFixed(2);
          return (
            <div
              key={index}
              className="absolute top-0 h-full"
              style={{
                left: `${startPercentage}%`,
                width: `${widthPercentage}%`,
                transform: 'translateX(1px)',
              }}
            />
          );
        })}

        {highlightedSegments.map((segment) => {
          const startPercentage = (segment.startTime / duration) * 100 + 0.5;
          const widthPercentage = (
            ((segment.endTime - segment.startTime) / duration) * 100 -
            1
          ).toFixed(2);
          return (
            <div
              key={`highlight-${segment.id}`}
              className="timeline-highlight"
              style={{
                left: `${startPercentage}%`,
                width: `${widthPercentage}%`,
              }}
            />
          );
        })}

        <div className="timeline-thumb" style={{ left: `${progressPercentage}%` }} />
      </div>

      <div className="timeline-hint">Click on highlighted segments to navigate</div>
    </div>
  );
};

export default Timeline;
