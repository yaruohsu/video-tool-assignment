import clsx from 'clsx';
import { Title } from '../../components';
import useTranscriptStore from '../../store/useTranscriptStore';

const TranscriptEditor = () => {
  const { transcript } = useTranscriptStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  console.log('transcript', transcript);
  return (
    transcript && (
      <div className="editing-area scrollbar-thin">
        <div className="editing-content">
          <Title>Transcript</Title>
          <div className="space-y-6">
            {transcript.map((section, sectionIndex) => (
              <div key={sectionIndex} className="section-card">
                <h2 className="section-title">{section.title}</h2>

                <div className="space-y-3">
                  {section.segments.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={clsx(
                        'transcript-item',
                        item.isHighlighted
                          ? 'bg-primary-50 border-primary-200 shadow-sm'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className="transcript-time">{formatTime(item.startTime)}</span>
                        <span
                          className={clsx(
                            'transcript-text',
                            item.isHighlighted ? 'text-gray-800 font-medium' : 'text-gray-600'
                          )}
                        >
                          {item.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};
export default TranscriptEditor;
