import { styled } from '@linaria/react';
import { OpenFileButton } from './open-file-button';
import { SaveFileButton } from './save-file-button';

type Props = {
  filePath: string | null;
  loading: boolean;
  handleProcessFile: (filePath: string) => unknown;
  handleExportFile: (saveFilePath: string) => unknown;
};

export function Header({
  filePath,
  loading,
  handleProcessFile,
  handleExportFile,
}: Props) {
  return (
    <Wrapper>
      <OpenFileButton onChange={handleProcessFile} />
      {filePath !== null && (
        <>
          <FilePath>
            {filePath}
            {loading ? (
              <Loading>Loading changes...</Loading>
            ) : (
              <Watching>Watching for changes</Watching>
            )}
          </FilePath>
          <SaveFileButton filePath={filePath} onSave={handleExportFile} />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  background: #000;
  /* background: #003865; */
  color: #fff;
  padding: 0.6rem;
  font-weight: 600;
`;

const FilePath = styled.span`
  flex: 1;
  padding: 0 1rem 0.1rem;
  font-size: 0.7rem;
`;

const FileStatus = styled.span`
  display: block;
  color: #29e808;
  line-height: 1;
`;

const Watching = styled(FileStatus)`
  color: #29e808;
`;

const Loading = styled(FileStatus)`
  color: #e88308;
`;
