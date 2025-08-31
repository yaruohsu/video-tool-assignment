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
  setTranscript: (transcript: TranscriptSection[]) => void;
}

const useTranscriptStore = create<TranscriptStoreState>((set) => ({
  transcript: null,
  setTranscript: (transcript: TranscriptSection[]) => set({ transcript }),
}));

export default useTranscriptStore;
