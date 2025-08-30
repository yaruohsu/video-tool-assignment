import useVideoStore from '../store/videoStore';

const useVideoUpload = () => {
  const videoUrl = useVideoStore((state) => state.videoUrl);
  const setVideoUrl = useVideoStore((state) => state.setVideoUrl);

  const uploadToServer = async (file: File) => {
    console.log('uploading:', file.name);
    // integration with backend API would go here
  };

  const validateFile = (file: File) => {
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    return validTypes.includes(file.type);
  };

  const handleFiles = (file: File) => {
    if (!validateFile(file)) {
      alert('Sorry, we currently only support MP4, MOV, and AVI files.');
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
    handleFiles,
  };
};

export default useVideoUpload;
