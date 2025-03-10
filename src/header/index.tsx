import { OpenFileButton } from './open-file-button';
import { SaveFileButton } from './save-file-button';

type Props = {
  filePath: string;
  loading: boolean;
  handleProcessFile: (filePath: string | null) => unknown;
  handleExportFile: (saveFilePath: string) => unknown;
};

export function Header({
  filePath,
  loading,
  handleProcessFile,
  handleExportFile,
}: Props) {
  return (
    <header>
      <OpenFileButton onChange={handleProcessFile} />
      {filePath !== '' && (
        <>
          <span className="file-path">
            {filePath}
            {loading ? (
              <span className="file-status loading">
                Loading changes...
              </span>
            ) : (
              <span className="file-status watching">
                Watching for changes
              </span>
            )}
          </span>
          <SaveFileButton filePath={filePath} onSave={handleExportFile} />
        </>
      )}
    </header>
  );
}
