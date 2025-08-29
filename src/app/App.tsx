import { TranscriptEditor } from '../modules/editor';
import { HighlightPlayer } from '../modules/preview';

const App = () => {
  return (
    <div className="layout-container">
      <div className="layout-flex">
        <TranscriptEditor />
        <HighlightPlayer />
      </div>
    </div>
  );
};

export default App;
