import classNames from 'classnames';

type Props = {
  numWatchedFiles: number;
  loading: boolean;
  status: string;
};

export function Status({ status, loading, numWatchedFiles }: Props) {
  if (!loading) {
    const str = numWatchedFiles > 1 ? `${numWatchedFiles} files` : 'file';
    return <span className="file-status">Watching {str} for changes</span>;
  }

  return (
    <span className={classNames('file-status', { loading })}>
      {status}
    </span>
  );
}
