import { setFailed } from '@actions/core';
import { getOctokit } from '@actions/github';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const owner = 'dmca-glasgow';
const repo = 'isos';
const gistId = '12a09637fb047aa519cc2ea5fd662a8c';
const gistFileName = 'isos-update.json';

type Asset = {
  id: number;
  name: string;
  browser_download_url: string;
};

type Platform = {
  signature: string;
  url: string;
};

type VersionContent = {
  version: string;
  notes: string;
  pub_date: string;
  platforms: {
    [key: string]: Platform;
  };
};

run();

async function run() {
  try {
    const token = String(process.env.ACCESS_TOKEN);
    const releaseId = Number(process.env.RELEASE_ID);

    const octokit = getOctokit(token);
    const version = await getVersion();

    const releaseAssets = await octokit.request(
      `GET /repos/${owner}/${repo}/releases/${releaseId}/assets`,
    );
    const assets = releaseAssets.data as Asset[];

    // console.log(assets.map((o) => o.name));

    const latestJsonAsset = getAsset(assets, 'latest.json');

    console.log('getting latest.json contents...');
    const updater = await getAssetTextContent(token, latestJsonAsset);

    console.log('removing latest.json asset...');
    await octokit.rest.repos.deleteReleaseAsset({
      owner,
      repo,
      asset_id: latestJsonAsset.id,
    });

    console.log('removing .sig assets...');
    await Promise.all(
      assets
        .filter((asset) => asset.name.endsWith('.sig'))
        .map((asset) =>
          octokit.rest.repos.deleteReleaseAsset({
            owner,
            repo,
            asset_id: asset.id,
          }),
        ),
    );

    console.log('renaming release assets...');
    const macArmInstaller = getAsset(assets, 'aarch64.dmg');
    const macArmUpdater = getAsset(assets, 'aarch64.app.tar.gz');
    const macIntelInstaller = getAsset(assets, 'x64.dmg');
    const macIntelUpdater = getAsset(assets, 'x64.app.tar.gz');
    const windowsInstaller = getAsset(assets, '-setup.exe');
    const windowsUpdater = getAsset(assets, '-setup.nsis.zip');
    const linuxInstaller = getAsset(assets, 'amd64.AppImage');
    const linuxUpdater = getAsset(assets, 'amd64.AppImage.tar.gz');

    const macArmInstallerName = `isos_installer_mac_${version}_aarch64.dmg`;
    const macIntelInstallerName = `isos_installer_mac_${version}_x64.dmg`;
    const windowsInstallerName = `isos_installer_win_${version}_x64-setup.exe`;
    const linuxInstallerName = `isos_installer_nix_${version}_amd64.AppImage`;

    const macArmInstallerLabel = `ISOS installer for Mac (Apple Silicon)`;
    const macIntelInstallerLabel = `ISOS installer for Mac (Intel)`;
    const windowsInstallerLabel = `ISOS installer for Windows`;
    const linuxInstallerLabel = `ISOS installer for Linux (cross-distribution AppImage)`;

    const macArmUpdaterName = `isos_updater_mac_${version}_aarch64.app.tar.gz`;
    const macIntelUpdaterName = `isos_updater_mac_${version}_x64.app.tar.gz`;
    const windowsUpdaterName = `isos_updater_win_${version}_x64-setup.nsis.zip`;
    const linuxUpdaterName = `isos_updater_nix_${version}_amd64.AppImage.tar.gz`;

    renameUpdaterAsset(updater, 'darwin-aarch64', macArmUpdaterName);
    renameUpdaterAsset(updater, 'darwin-x86_64', macIntelUpdaterName);
    renameUpdaterAsset(updater, 'windows-x86_64', windowsUpdaterName);
    renameUpdaterAsset(updater, 'linux-x86_64', linuxUpdaterName);

    // console.log('updater', updater);

    const newAssets = [
      {
        id: macArmInstaller.id,
        name: macArmInstallerName,
        label: macArmInstallerLabel,
      },
      {
        id: macArmUpdater.id,
        name: macArmUpdaterName,
      },
      {
        id: macIntelInstaller.id,
        name: macIntelInstallerName,
        label: macIntelInstallerLabel,
      },
      {
        id: macIntelUpdater.id,
        name: macIntelUpdaterName,
      },
      {
        id: windowsInstaller.id,
        name: windowsInstallerName,
        label: windowsInstallerLabel,
      },
      {
        id: windowsUpdater.id,
        name: windowsUpdaterName,
      },
      {
        id: linuxInstaller.id,
        name: linuxInstallerName,
        label: linuxInstallerLabel,
      },
      {
        id: linuxUpdater.id,
        name: linuxUpdaterName,
      },
    ];

    // console.log(
    //   newAssets
    //     .sort((a, b) => a.name.localeCompare(b.name))
    //     .map((o) => o.label || o.name),
    // );

    await Promise.all(
      newAssets.map(({ id, ...toUpdate }) =>
        octokit.rest.repos.updateReleaseAsset({
          owner,
          repo,
          asset_id: id,
          ...toUpdate,
        }),
      ),
    );

    console.log('publishing release...');
    await octokit.rest.repos.updateRelease({
      owner,
      repo,
      release_id: releaseId,
      draft: false,
    });

    console.log('uploading latest.json as gist...');
    const release = await octokit.request(
      `GET /repos/${owner}/${repo}/releases/${releaseId}`,
    );
    updater.notes = String(release.data.body);
    await octokit.rest.gists.update({
      gist_id: gistId,
      files: {
        [gistFileName]: {
          content: JSON.stringify(updater, null, 2),
        },
      },
    });
  } catch (error) {
    setFailed(error as Error);
  }
}

async function getVersion(): Promise<string> {
  const filePath = `src-tauri/tauri.conf.json`;
  const contents = await readFile(filePath, 'utf-8');
  const json = JSON.parse(contents);
  return json.package.version;
}

async function getAssetTextContent(token: string, asset: Asset) {
  const octokit = getOctokit(token);
  const res = await octokit.request(
    `GET /repos/${owner}/${repo}/releases/assets/${asset.id}`,
    {
      headers: {
        Accept: 'application/octet-stream',
      },
    },
  );
  const contents = new TextDecoder('utf-8').decode(res.data);
  return JSON.parse(contents) as VersionContent;
}

function getAsset(assets: Asset[], endsWith: string) {
  const result = assets.find((o) => o.name.endsWith(endsWith));
  if (!result) {
    throw new Error(`No asset ends with: ${endsWith}`);
  }
  return result;
}

function renameUpdaterAsset(
  updater: VersionContent,
  platform: string,
  name: string,
) {
  const oldUrl = updater.platforms[platform].url;
  const newUrl = `${path.parse(oldUrl).dir}/${name}`;
  updater.platforms[platform].url = newUrl;
}
