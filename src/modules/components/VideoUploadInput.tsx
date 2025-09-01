import clsx from 'clsx';

type VideoUploadInputProps = {
  id?: string;
  children?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const VideoUploadInput = ({ id, children, onChange, className }: VideoUploadInputProps) => (
  <label className={clsx('m-2 ', className)}>
    {children}
    <input id={id} type="file" accept=".mp4,.mov,.avi" className="hidden" onChange={onChange} />
  </label>
);

export default VideoUploadInput;
