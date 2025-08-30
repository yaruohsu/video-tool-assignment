import clsx from 'clsx';

type VideoUploadInputProps = {
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const VideoUploadInput = ({ children, onChange, className }: VideoUploadInputProps) => (
  <label className={clsx('m-2 ', className)}>
    {children}
    <input type="file" accept=".mp4,.mov,.avi" className="hidden" onChange={onChange} />
  </label>
);

export default VideoUploadInput;
