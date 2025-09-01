import type { ChangeEvent } from 'react';
import { RotateCcw } from 'lucide-react';
import { Title } from '../../components';
import HighlightPlayer from './HighlightPlayer';
import useVideoUpload from '../../hooks/useVideoUpload';
import { VideoUploadInput } from '../../components';

const Preview = () => {
  const { handleFileUpload } = useVideoUpload();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };
  return (
    <div className="preview-area">
      <div className="flex items-baseline justify-between">
        <Title className="text-white">Preview</Title>
        <VideoUploadInput onChange={handleFileChange}>
          <span className="flex align-baseline gap-1 cursor-pointer text-gray-200 hover:text-primary-500 text-xs md:text-sm">
            <RotateCcw className="w-4 h-4" />
            <span>Replace Video</span>
          </span>
        </VideoUploadInput>
      </div>
      <HighlightPlayer />
    </div>
  );
};

export default Preview;
