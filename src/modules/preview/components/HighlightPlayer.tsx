import { Play, ChevronRight, ChevronLeft } from 'lucide-react';
const HighlightPlayer = () => {
  return (
    <>
      <div className="preview-area">
        <div className="video-container">
          <div className="video-wrapper">
            <div className="video-screen">
              <div className="text-center space-y-4">
                <h2 className="video-title">Video Preview</h2>
                <p className="video-subtitle">Simply press this button to start.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="control-panel">
          <div className="control-content">
            <div className="control-buttons">
              <button className="control-btn">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button className="play-btn">
                <Play className="w-6 h-6 text-white" />
              </button>

              <button className="control-btn">
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="progress-container">
              <span className="time-display">00:45</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '62%' }}>
                  <div className="progress-thumb"></div>
                </div>
                <div className="progress-markers">
                  <div className="progress-marker" style={{ left: '15%' }}></div>
                  <div className="progress-marker" style={{ left: '35%' }}></div>
                  <div className="progress-marker" style={{ left: '55%' }}></div>
                  <div className="progress-marker" style={{ left: '75%' }}></div>
                  <div className="progress-marker" style={{ left: '85%' }}></div>
                </div>
              </div>
              <span className="time-display">01:10</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HighlightPlayer;
