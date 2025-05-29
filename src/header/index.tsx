import { OpenFileButton } from './open-file-button';
import { OverflowMiddle } from './overflow-middle';
import { SaveFileButton } from './save-file-button';

type Props = {
  filePath: string;
  numWatchedFiles: number;
  loading: boolean;
  handleProcessFile: (filePath: string | null) => unknown;
  handleExportFile: (saveFilePath: string) => unknown;
};

export function Header({
  filePath,
  numWatchedFiles,
  loading,
  handleProcessFile,
  handleExportFile,
}: Props) {
  const str = numWatchedFiles > 1 ? `${numWatchedFiles} files` : 'file';
  return (
    <header>
      <OpenFileButton onChange={handleProcessFile} />
      {filePath !== '' && (
        <>
          <span className="file-path">
            <OverflowMiddle text={filePath} />
            {loading ? (
              <span className="file-status loading">
                Loading changes...
              </span>
            ) : (
              <span className="file-status watching">
                Watching {str} for changes
              </span>
            )}
          </span>
          <SaveFileButton filePath={filePath} onSave={handleExportFile} />
        </>
      )}
    </header>
  );
}
