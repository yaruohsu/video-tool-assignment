import clsx from 'clsx';

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

const Title = ({ children, className }: TitleProps) => (
  <h1 className={clsx('text-2xl font-bold mb-6 text-gray-800', className)}>{children}</h1>
);

export default Title;
