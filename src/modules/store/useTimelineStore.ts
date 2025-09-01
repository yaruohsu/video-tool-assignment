import { create } from 'zustand';

export interface TimelineState {
  currentTime: number;
  duration: number;
  timelineData: Array<{
    startTime: number;
    endTime: number;
    segmentId: string;
    isHighlighted: boolean;
  }>;
  currentSegmentId: string | null;
  isPlaying: boolean;

  // playback controls
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;

  // nav
  skipToNextHighlight: () => void;
  skipToPreviousHighlight: () => void;

  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  updateCurrentSegment: () => void;
  setTimelineData: (data: TimelineState['timelineData']) => void;
  seekTo: (time: number) => void;
  reset: () => void;
}

const useTimelineStore = create<TimelineState>((set, get) => ({
  currentTime: 0,
  duration: 0,
  timelineData: [],
  currentSegmentId: null,
  isPlaying: false,

  // playback controls
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlayPause: () => {
    const { isPlaying } = get();
    set({ isPlaying: !isPlaying });
  },

  // nav
  skipToNextHighlight: () => {
    const { currentTime, timelineData } = get();
    const nextHighlight = timelineData
      .filter((item) => item.isHighlighted && item.startTime > currentTime)
      .sort((a, b) => a.startTime - b.startTime)[0];

    if (nextHighlight) {
      get().seekTo(nextHighlight.startTime);
    }
  },

  skipToPreviousHighlight: () => {
    const { currentTime, timelineData } = get();
    const previousHighlight = timelineData
      .filter((item) => item.isHighlighted && item.startTime < currentTime)
      .sort((a, b) => b.startTime - a.startTime)[0];

    if (previousHighlight) {
      get().seekTo(previousHighlight.startTime);
    }
  },

  setCurrentTime: (time) => {
    set({ currentTime: time });
    get().updateCurrentSegment();
  },
  setDuration: (duration) => set({ duration }),
  setTimelineData: (data) => set({ timelineData: data }),
  seekTo: (time) => {
    set({ currentTime: time });
    get().updateCurrentSegment();
  },

  updateCurrentSegment: () => {
    const { currentTime, timelineData } = get();
    const currentSegment = timelineData.find(
      (item) => currentTime >= item.startTime && currentTime < item.endTime
    );

    set({ currentSegmentId: currentSegment?.segmentId || null });
  },

  reset: () =>
    set({
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      timelineData: [],
      currentSegmentId: null,
    }),
}));

export default useTimelineStore;
