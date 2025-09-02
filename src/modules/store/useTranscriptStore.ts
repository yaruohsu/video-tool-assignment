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
  toggleSegmentHighlight: (sectionId: string, segmentId: string) => void;
}

const useTranscriptStore = create<TranscriptStoreState>((set) => ({
  transcript: null,
  highlightedSegments: [],

  setTranscript: (transcript: TranscriptSection[]) => set({ transcript }),
  setHighlightedSegments: (segments: TranscriptSegment[]) => set({ highlightedSegments: segments }),
  toggleSegmentHighlight: (sectionId: string, segmentId: string) =>
    set((state) => {
      if (!state.transcript) return state;

      const updatedTranscript = state.transcript.map((section) => ({
        ...section,
        segments: section.segments.map((segment) =>
          section.id === sectionId && segment.id === segmentId
            ? { ...segment, isHighlighted: !segment.isHighlighted }
            : segment
        ),
      }));
      const updatedHighlightedSegments = updatedTranscript.flatMap((section) =>
        section.segments
          .filter((segment) => segment.isHighlighted)
          .map((segment) => ({ ...segment, sectionId: section.id }))
      );

      return {
        ...state,
        transcript: updatedTranscript,
        highlightedSegments: updatedHighlightedSegments,
      };
    }),
}));

export default useTranscriptStore;
