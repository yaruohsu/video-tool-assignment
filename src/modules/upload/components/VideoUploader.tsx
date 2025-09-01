import type { DragEvent, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import { VideoUploadInput } from '../../components';
import useVideoUpload from '../../hooks/useVideoUpload';
import { MAX_SIZE_MB } from '../../../constants';

const VideoUploader = () => {
  const { handleFileUpload } = useVideoUpload();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-50">
      <div
        id="dropzone"
        className="relative"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label
          id="upload-label"
          className="flex flex-col items-center justify-center w-80 h-40 md:w-96 md:h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-colors duration-300
             border-primary-200 bg-white hover:border-primary-500 hover:bg-primary-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className='className="w-12 h-12 mb-3 text-primary-500 hover:text-primary-600 animate-bounce' />

            <p className="mb-2 text-sm text-gray-600 hidden md:block">
              <span className="font-semibold text-primary-600">Drag & Drop</span> your file here or
              click to select
            </p>

            <p className="mb-2 text-sm text-gray-600 block md:hidden">Tap here to select a file</p>

            <p className="text-xs text-gray-400">{`MP4, MOV, AVI (max ${MAX_SIZE_MB}MB)`}</p>
          </div>
          <VideoUploadInput id="dropzone-file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};

export default VideoUploader;
