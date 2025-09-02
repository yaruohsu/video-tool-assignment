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

const round = (num: number, decimals = 2) => Math.round(num * 10 ** decimals) / 10 ** decimals;

const generateVideoResponse = (duration: number): ProcessVideoResponse => {
  const visibleSegments = segmentsJson
    .filter((s) => s.startTime < duration)
    .map((s) => ({
      ...s,
      startTime: round(s.startTime),
      endTime: round(Math.min(s.endTime, duration)),
    }));

  // generate 3~5 sections
  const numSections = Math.min(Math.max(Math.floor(duration / 30), 3), 5);
  const sectionDuration = duration / numSections;

  const assignedSegmentIds = new Set<string>();

  const sections: TranscriptSectionRawData[] = Array.from({ length: numSections }).map((_, i) => {
    const start = round(i * sectionDuration);
    const end = round((i + 1) * sectionDuration);

    const sectionSegments = visibleSegments.filter(
      (seg) => !assignedSegmentIds.has(seg.id) && seg.startTime < end && seg.endTime > start
    );

    // mark these segments as assigned
    sectionSegments.forEach((seg) => assignedSegmentIds.add(seg.id));

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
      highlightedSegments: visibleSegments.filter((seg) => seg.isHighlighted),
    },
  };
};

export default generateVideoResponse;
