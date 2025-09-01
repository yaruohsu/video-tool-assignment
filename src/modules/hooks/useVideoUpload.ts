import useVideoStore from '../store/useVideoStore';
import useVideoProcessing from './useVideoProcessing';

type UseVideoUploadOptions = {
  maxSizeMB?: number; // default to 10 MB
};

type UseVideoUploadResult = {
  handleFileUpload: (file: File) => void;
};

const useVideoUpload = (options?: UseVideoUploadOptions): UseVideoUploadResult => {
  const maxSize = (options?.maxSizeMB || 10) * 1024 * 1024; // bytes
  const videoUrl = useVideoStore((state) => state.videoUrl);
  const setVideoUrl = useVideoStore((state) => state.setVideoUrl);

  const { processVideo } = useVideoProcessing();

  const uploadToServer = async (file: File) => {
    console.log('uploading:', file.name);

    processVideo(file);
  };

  const validateFile = (file: File) => {
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    return validTypes.includes(file.type);
  };

  const handleFileUpload = (file: File) => {
    if (!validateFile(file)) {
      alert('Sorry, we currently only support MP4, MOV, and AVI files.');
      return;
    }

    if (file.size > maxSize) {
      alert('Sorry, the maximum allowed file size is 10 MB.');
      return;
    }

    if (videoUrl) {
      const confirmReplace = confirm(
        'Uploading a new video will replace the current one. Do you want to continue?'
      );
      if (!confirmReplace) return;
    }

    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    uploadToServer(file);
  };

  return {
    handleFileUpload,
  };
};

export default useVideoUpload;
