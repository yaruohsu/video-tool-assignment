import { create } from 'zustand';

interface TimelineState {
  currentTime: number;
  duration: number;
  timelineData: Array<{
    startTime: number;
    endTime: number;
    segmentId: string;
    isHighlighted: boolean;
  }>;
  currentSegmentId: string | null;
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
      timelineData: [],
      currentSegmentId: null,
    }),
}));

export default useTimelineStore;
