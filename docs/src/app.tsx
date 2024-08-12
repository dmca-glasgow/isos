import './app.css';

// https://github.com/dmca-glasgow/isos/releases/download/v0.0.17/isos_x64.app.tar.gz
// https://github.com/dmca-glasgow/isos/releases/download/v0.0.17/isos_aarch64.app.tar.gz
// https://github.com/dmca-glasgow/isos/releases/download/v0.0.17/isos_0.0.17_x64-setup.nsis.zip
// https://github.com/dmca-glasgow/isos/releases/download/v0.0.17/isos_0.0.17_amd64.AppImage.tar.gz

const version = import.meta.env.VITE_ISOS_VERSION;

export function App() {
  return (
    <>
      <h1>ISOS downloads</h1>
      <ul>
        <li>
          <DownloadLink
            label="MacOS (Intel)"
            fileName="isos_x64.app.tar.gz"
          />
        </li>
        <li>
          <DownloadLink
            label="MacOS (Apple Silicon)"
            fileName="isos_aarch64.app.tar.gz"
          />
        </li>
        <li>
          <DownloadLink
            label="Windows"
            fileName={`isos_${version}_x64-setup.nsis.zip`}
          />
        </li>
        <li>
          <DownloadLink
            label="Linux"
            fileName={`isos_${version}_amd64.AppImage`}
          />
        </li>
      </ul>
    </>
  );
}

type LinkProps = {
  label: string;
  fileName: string;
};

function DownloadLink({ label, fileName }: LinkProps) {
  return <a href={createHref(fileName)}>{label}</a>;
}

function createHref(fileName: string) {
  return `https://github.com/dmca-glasgow/isos/releases/download/v${version}/${fileName}`;
}
