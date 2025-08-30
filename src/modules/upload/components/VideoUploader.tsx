import type { DragEvent, ChangeEvent } from 'react';
import VideoUploadInput from '../../components/VideoUploadInput';
import useVideoUpload from '../../hooks/useVideoUpload';

const VideoUploader = () => {
  const { handleFiles } = useVideoUpload();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFiles(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFiles(file);
  };

  return (
    <div className="mt-4 flex flex-col items-center space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-96 h-40 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center rounded-xl cursor-pointer hover:border-blue-500 transition"
      >
        <p className="text-center p-1 md:p-2">
          Drag and drop your video here, or use the button to upload
        </p>
        <p className="text-gray-500 text-xs p-1">Supported formats: MP4, MOV, AVI</p>

        <VideoUploadInput onChange={handleFileChange}>
          <span className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow cursor-pointer hover:bg-blue-600">
            Select Video
          </span>
        </VideoUploadInput>
      </div>
    </div>
  );
};

export default VideoUploader;
