import segmentsJson from './segments.json';
import type {
  ProcessVideoResponse,
  TranscriptSectionRawData,
  TimelineRawDataPoint,
} from '../api/types';

const sectionTitleSamples = [
  'Introduction',
  'Main Content',
  'Conclusion',
  'Key Points',
  'Summary',
  'Highlights',
  'Overview',
  'Details',
  'Analysis',
  'Discussion',
];

const generateVideoResponse = (
  duration: number // seconds
): ProcessVideoResponse => {
  const visibleSegments = segmentsJson
    .filter((s) => s.startTime < duration)
    .map((s) => ({
      ...s,
      endTime: Math.min(s.endTime, duration),
    }));

  const numSections = Math.min(Math.max(Math.floor(duration / 30), 3), 5); // 3~5 sections
  const sectionDuration = duration / numSections;

  const sections: TranscriptSectionRawData[] = Array.from({ length: numSections }).map((_, i) => {
    const start = i * sectionDuration;
    const end = (i + 1) * sectionDuration;

    const sectionSegments = visibleSegments.filter(
      (seg) => seg.startTime < end && seg.endTime > start
    );

    return {
      id: `section-${i + 1}`,
      title: sectionTitleSamples[i % sectionTitleSamples.length],
      startTime: start,
      endTime: end,
      segments: sectionSegments,
    };
  });

  const timelineData: TimelineRawDataPoint[] = visibleSegments.map((seg) => ({
    startTime: seg.startTime,
    endTime: seg.endTime,
    segmentId: seg.id,
    isHighlighted: seg.isHighlighted,
    color: seg.highlightColor,
    highlightNotes: seg.highlightNotes,
  }));

  return {
    success: true,
    data: {
      videoId: '3ab03bb3-0dac-4efb-b5d7-8a97ea22f8e3',
      metadata: {
        title: 'The intern',
        duration,
        language: 'en',
      },
      sections,
      timelineData,
    },
  };
};

export default generateVideoResponse;
