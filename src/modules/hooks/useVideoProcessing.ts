import { transcriptApi } from '../../api';
import useTranscriptStore from '../store/useTranscriptStore';
import useApiStatusStore from '../store/useApiStatusStore';

const useVideoProcessing = () => {
  const { setLoading, setError } = useApiStatusStore();
  const { setTranscript } = useTranscriptStore();

  const processVideo = async (videoFile: File) => {
    try {
      setLoading(true);
      setError(null);

      const response = await transcriptApi.processVideo(videoFile);
      setTranscript(response.data.sections);
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
