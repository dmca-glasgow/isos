const version = window.__ENV__.VITE_ISOS_VERSION;

const macArmInstallerLabel = `ISOS installer for Mac (Apple Silicon)`;
const macArmInstallerName = `isos_installer_mac_${version}_aarch64.dmg`;

const macIntelInstallerLabel = `ISOS installer for Mac (Intel)`;
const macIntelInstallerName = `isos_installer_mac_${version}_x64.dmg`;

const windowsInstallerLabel = `ISOS installer for Windows`;
const windowsInstallerName = `isos_installer_win_${version}_x64-setup.exe`;

const linuxInstallerLabel = `ISOS installer for Linux (cross-distribution AppImage)`;
const linuxInstallerName = `isos_installer_nix_${version}_amd64.AppImage`;

export function Downloads() {
  return (
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
  );
}

function createHref(fileName: string, version: string) {
  return `https://github.com/dmca-glasgow/isos/releases/download/v${version}/${fileName}`;
}
