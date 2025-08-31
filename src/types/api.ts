export interface GetTranscriptResponse {
  success: boolean;
  data: {
    videoId: string;
    metadata: {
      title: string;
      duration: number;
      language: string;
      transcriptionStatus: 'completed' | 'processing' | 'failed';
      processingTime?: number;
      confidence?: number;
    };
    sections: Array<{
      id: string;
      title: string;
      startTime: number;
      endTime: number;
      summary?: string;
      segments: Array<{
        id: string;
        startTime: number;
        endTime: number;
        text: string;
        isHighlighted: boolean;
      }>;
      highlightColor?: string;
    }>;
    timelineData: Array<{
      startTime: number;
      endTime: number;
      segmentId: string;
      isHighlighted: boolean;
      color?: string;
    }>;
    stats: {
      totalSegments: number;
      highlightedSegments: number;
      totalDuration: number;
      wordsPerMinute?: number;
      highlightsByType?: Record<string, number>;
    };
  };
  error?: string;
}
