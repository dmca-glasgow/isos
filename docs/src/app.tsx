import './app.css';

const version = window.__ENV__.VITE_ISOS_VERSION;

const macArmInstallerName = `isos_installer_mac_${version}_aarch64.dmg`;
const macIntelInstallerName = `isos_installer_mac_${version}_x64.dmg`;
const windowsInstallerName = `isos_installer_win_${version}_x64-setup.exe`;
const linuxInstallerName = `isos_installer_nix_${version}_amd64.AppImage`;

const macArmInstallerLabel = `ISOS installer for Mac (Apple Silicon)`;
const macIntelInstallerLabel = `ISOS installer for Mac (Intel)`;
const windowsInstallerLabel = `ISOS installer for Windows`;
const linuxInstallerLabel = `ISOS installer for Linux (cross-distribution AppImage)`;

export function App() {
  return (
    <>
      <h1>ISOS downloads</h1>
      <ul>
        <li>
          <a href={createHref(macArmInstallerName, version)}>
            {macArmInstallerLabel}
          </a>
        </li>
        <li>
          <a href={createHref(macIntelInstallerName, version)}>
            {macIntelInstallerLabel}
          </a>
        </li>
        <li>
          <a href={createHref(windowsInstallerName, version)}>
            {windowsInstallerLabel}
          </a>
        </li>
        <li>
          <a href={createHref(linuxInstallerName, version)}>
            {linuxInstallerLabel}
          </a>
        </li>
      </ul>
    </>
  );
}

function createHref(fileName: string, version: string) {
  return `https://github.com/dmca-glasgow/isos/releases/download/v${version}/${fileName}`;
}
