import { create } from 'zustand';

interface TranscriptSegment {
  id: string;
  startTime: number; // seconds
  endTime: number;
  text: string;
  isHighlighted: boolean; // for highlight clip
}

interface TranscriptSection {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  segments: TranscriptSegment[];
}

interface TranscriptStoreState {
  transcript: TranscriptSection[] | null;
  highlightedSegments: TranscriptSegment[];

  setTranscript: (transcript: TranscriptSection[]) => void;
  setHighlightedSegments: (segments: TranscriptSegment[]) => void;
}

const useTranscriptStore = create<TranscriptStoreState>((set) => ({
  transcript: null,
  highlightedSegments: [],

  setTranscript: (transcript: TranscriptSection[]) => set({ transcript }),
  setHighlightedSegments: (segments: TranscriptSegment[]) => set({ highlightedSegments: segments }),
}));

export default useTranscriptStore;
