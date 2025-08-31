import { useState } from 'react';
import { transcriptApi } from '../../api';

const useVideoProcessing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processVideo = async (videoFile: File) => {
    try {
      setLoading(true);
      setError(null);

      const response = await transcriptApi.processVideo(videoFile);
      console.log('Video processed successfully:', response);
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
    loading,
    error,
    reset,
  };
};

export default useVideoProcessing;
