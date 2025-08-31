import { TranscriptEditor } from '../modules/editor';
import { VideoUploader } from '../modules/upload';
import useVideoStore from '../modules/store/useVideoStore';
import { Preview } from '../modules/preview';

const App = () => {
  const videoUrl = useVideoStore((state) => state.videoUrl);

  return (
    <div className="layout-container">
      {!videoUrl ? (
        <VideoUploader />
      ) : (
        <div className="layout-flex">
          <TranscriptEditor />
          <Preview />
        </div>
      )}
    </div>
  );
};

export default App;
