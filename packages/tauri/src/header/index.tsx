import { LogToggle } from './log-toggle';
import { OpenFileButton } from './open-file-button';
import { OverflowMiddle } from './overflow-middle';
import { SaveFileButton } from './save-file-button';
import { Status } from './status';
import { WarningsCount } from './warnings-count';

type Props = {
  filePath: string;
  numWatchedFiles: number;
  loading: boolean;
  status: string;
  handleProcessFile: (filePath: string | null) => unknown;
  handleExportFile: (saveFilePath: string) => unknown;
};

export function Header({
  filePath,
  numWatchedFiles,
  loading,
  status,
  handleProcessFile,
  handleExportFile,
}: Props) {
  return (
    <header>
      <OpenFileButton onChange={handleProcessFile} />
      {filePath !== '' && (
        <>
          <span className="file-path">
            <OverflowMiddle text={filePath} />
            <Status
              status={status}
              loading={loading}
              numWatchedFiles={numWatchedFiles}
            />
          </span>
          <WarningsCount loading={loading} />
          <LogToggle />
          <SaveFileButton filePath={filePath} onSave={handleExportFile} />
        </>
      )}
    </header>
  );
}
