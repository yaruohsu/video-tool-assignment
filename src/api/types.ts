interface TranscriptSegmentRawData {
  id: string;
  startTime: number; // seconds
  endTime: number;
  text: string;
  isHighlighted: boolean; // for highlight clip
  highlightColor?: string;
  highlightNotes?: string;
}

export interface TranscriptSectionRawData {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  segments: TranscriptSegmentRawData[];
  segmentsNotes?: string;
}

export interface TimelineRawDataPoint {
  startTime: number;
  endTime: number;
  segmentId: string;
  isHighlighted: boolean;
  color?: string;
  highlightNotes?: string;
}

export interface ProcessVideoResponse {
  success: boolean;
  data: {
    videoId: string;
    metadata: {
      title: string;
      duration: number; //seconds
      language: string;
    };
    sections: TranscriptSectionRawData[];
    timelineData: TimelineRawDataPoint[];
  };
  error?: string;
}
