import { TranscriptEditor } from '../modules/editor';
import { VideoUploader } from '../modules/upload';
import useVideoStore from '../modules/store/useVideoStore';
import { Preview } from '../modules/preview';
import { LoadingPulsingDot } from '../modules/components';
import useApiStatusStore from '../modules/store/useApiStatusStore';

const App = () => {
  const { videoUrl } = useVideoStore();
  const { loading } = useApiStatusStore();

  if (loading) return <LoadingPulsingDot />;

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
