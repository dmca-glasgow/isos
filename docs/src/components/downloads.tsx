// const version = window.__ENV__.VITE_ISOS_VERSION;
const version = '0.0.71';

const macArmInstallerLabel = `ISOS installer for Mac (Apple Silicon)`;
const macArmInstallerName = `isos_installer_mac_${version}_aarch64.dmg`;

const macIntelInstallerLabel = `ISOS installer for Mac (Intel)`;
const macIntelInstallerName = `isos_installer_mac_${version}_x64.dmg`;

const windowsInstallerLabel = `ISOS installer for Windows`;
const windowsInstallerName = `isos_installer_win_${version}_x64-setup.exe`;

// const linuxAppImageInstallerLabel = `ISOS installer for Linux (AppImage)`;
// const linuxAppImageInstallerName = `isos_installer_nix_${version}_amd64.AppImage`;

const linuxRpmInstallerLabel = `ISOS installer for Linux (rpm)`;
const linuxRpmInstallerName = `isos_installer_nix_${version}_x86_64.rpm`;

const linuxDebInstallerLabel = `ISOS installer for Linux (deb)`;
const linuxDebInstallerName = `isos_installer_nix_${version}_amd64.deb`;

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
      {/* <li>
        <a href={createHref(linuxAppImageInstallerName, version)}>
          {linuxAppImageInstallerLabel}
        </a>
      </li> */}
      <li>
        <a href={createHref(linuxRpmInstallerName, version)}>
          {linuxRpmInstallerLabel}
        </a>
      </li>
      <li>
        <a href={createHref(linuxDebInstallerName, version)}>
          {linuxDebInstallerLabel}
        </a>
      </li>
    </ul>
  );
}

function createHref(fileName: string, version: string) {
  return `https://github.com/isos-tools/isos/releases/download/v${version}/${fileName}`;
}
