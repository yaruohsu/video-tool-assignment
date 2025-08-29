import clsx from 'clsx';

interface VideoTranscriptItem {
  time: string;
  text: string;
  highlighted?: boolean;
}

const mokeTranscriptData: VideoTranscriptItem[] = [
  { time: '00:00', text: 'Welcome to our product demonstration.', highlighted: false },
  { time: '00:05', text: "Today, we'll be showcasing our latest innovation.", highlighted: true },
  { time: '00:15', text: 'Our product has three main features.', highlighted: false },
  { time: '00:20', text: "First, it's incredibly easy to use.", highlighted: false },
  { time: '00:25', text: "Second, it's highly efficient.", highlighted: false },
  { time: '00:30', text: "And third, it's cost-effective.", highlighted: false },
  { time: '00:40', text: 'Let me show you how it works.', highlighted: false },
  { time: '00:45', text: 'Simply press this button to start.', highlighted: true },
  { time: '00:50', text: 'The interface is intuitive and user-friendly.', highlighted: true },
  { time: '01:00', text: 'In conclusion, our product is a game-changer.', highlighted: false },
  { time: '01:05', text: "We're excited to bring this to market.", highlighted: true },
  { time: '01:10', text: 'Thank you for your attention.', highlighted: false },
];
const sections = [
  { title: 'Introduction', items: mokeTranscriptData.slice(0, 2) },
  { title: 'Key Features', items: mokeTranscriptData.slice(2, 6) },
  { title: 'Demonstration', items: mokeTranscriptData.slice(6, 9) },
  { title: 'Conclusion', items: mokeTranscriptData.slice(9, 12) },
];

const TranscriptEditor = () => {
  return (
    <div className="editing-area scrollbar-thin">
      <div className="editing-content">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Transcript</h1>
        <div className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="section-card">
              <h2 className="section-title">{section.title}</h2>

              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={clsx(
                      'transcript-item',
                      item.highlighted
                        ? 'bg-primary-50 border-primary-200 shadow-sm'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="transcript-time">{item.time}</span>
                      <span
                        className={clsx(
                          'transcript-text',
                          item.highlighted ? 'text-gray-800 font-medium' : 'text-gray-600'
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
  );
};
export default TranscriptEditor;
