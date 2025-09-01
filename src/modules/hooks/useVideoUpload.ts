import { MAX_SIZE_MB } from '../../constants';
import useVideoStore from '../store/useVideoStore';
import useVideoProcessing from './useVideoProcessing';

type UseVideoUploadResult = {
  handleFileUpload: (file: File) => void;
};

function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const url = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url); // 清理記憶體
      resolve(video.duration); // duration 以秒為單位
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load video'));
    };

    video.src = url;
  });
}

const useVideoUpload = (): UseVideoUploadResult => {
  const maxSize = MAX_SIZE_MB * 1024 * 1024; // bytes
  const videoUrl = useVideoStore((state) => state.videoUrl);
  const setVideoUrl = useVideoStore((state) => state.setVideoUrl);

  const { processVideo } = useVideoProcessing();

  const uploadToServer = async (file: File) => {
    console.log('uploading:', file.name);

    try {
      const duration = await getVideoDuration(file);
      processVideo({ videoFile: file, duration });
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload video. Please try again.');
      return;
    }
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
      alert(`Sorry, the maximum allowed file size is ${MAX_SIZE_MB} MB.`);
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
