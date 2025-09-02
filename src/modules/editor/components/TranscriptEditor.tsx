import clsx from 'clsx';
import { Title } from '../../components';
import useTranscriptStore from '../../store/useTranscriptStore';
import useTimelineStore from '../../store/useTimelineStore';

const TranscriptEditor = () => {
  const { transcript, toggleSegmentHighlight } = useTranscriptStore();
  const { seekTo, togglePlayPause, currentSegmentId } = useTimelineStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNavToTime = (time: number, isHighlighted: boolean) => (e: React.MouseEvent) => {
    if (!isHighlighted) return;
    e.stopPropagation();
    seekTo(time);
    togglePlayPause();
  };
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
                  {section.segments.map((segment) => (
                    <div
                      key={`${section}-${segment.id}`}
                      className={clsx(
                        'transcript-item',
                        segment.isHighlighted
                          ? 'bg-primary-50 border-primary-500 shadow-sm'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100',
                        currentSegmentId === segment.id && 'bg-primary-500'
                      )}
                    >
                      <div
                        className="flex items-start gap-3"
                        onClick={() => toggleSegmentHighlight(section.id, segment.id)}
                      >
                        <span
                          className={clsx(
                            'transcript-time',
                            segment.isHighlighted
                              ? 'bg-primary-200 cursor-pointer'
                              : 'bg-primary-50 cursor-not-allowed'
                          )}
                          onClick={handleNavToTime(segment.startTime, segment.isHighlighted)}
                        >
                          {formatTime(segment.startTime)}
                        </span>
                        <span
                          className={clsx(
                            'transcript-text',
                            segment.isHighlighted ? 'text-gray-800 font-medium' : 'text-gray-600',
                            currentSegmentId === segment.id && 'text-primary-50'
                          )}
                        >
                          {segment.text}
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
