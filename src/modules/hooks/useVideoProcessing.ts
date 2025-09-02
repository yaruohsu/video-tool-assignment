import { transcriptApi } from '../../api';
import useTranscriptStore from '../store/useTranscriptStore';
import useApiStatusStore from '../store/useApiStatusStore';
import useTimelineStore from '../store/useTimelineStore';

const useVideoProcessing = () => {
  const { setLoading, setError } = useApiStatusStore();
  const { setTranscript, setHighlightedSegments } = useTranscriptStore();
  const { setTimelineData } = useTimelineStore();

  const processVideo = async (data: { videoFile: File; duration: number }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await transcriptApi.processVideo(data);

      setTranscript(response.data.sections);
      setTimelineData(response.data.timelineData);
      setHighlightedSegments(response.data.highlightedSegments);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Processing failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setLoading(false);
  };

  return {
    processVideo,
    reset,
  };
};

export default useVideoProcessing;
