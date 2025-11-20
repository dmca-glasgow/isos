import { setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const { owner, repo } = context.repo;

type Asset = {
  id: number;
  name: string;
  browser_download_url: string;
};

type VersionContent = {
  version: string;
  notes: string;
  pub_date: string;
  platforms: {
    [key: string]: {
      signature: string;
      url: string;
    };
  };
};

run();

async function run() {
  try {
    const token = String(process.env.ACCESS_TOKEN);
    const releaseId = Number(process.env.RELEASE_ID);

    const octokit = getOctokit(token);

    const releaseAssets = await octokit.request(
      `GET /repos/${owner}/${repo}/releases/${releaseId}/assets`,
    );
    const assets = releaseAssets.data as Asset[];

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

    console.log('publishing release...');
    await octokit.rest.repos.updateRelease({
      owner,
      repo,
      release_id: releaseId,
      draft: false,
    });

    // const version = await getVersion();

    // console.log(
    //   'tauri generated release assets:',
    //   assets.map((o) => ({
    //     name: o.name,
    //     id: o.id,
    //   })),
    // );

    // console.log('getting latest.json contents...');
    // const latestJsonAsset = getAsset(assets, 'latest.json');
    // const updater = await getAssetTextContent(token, latestJsonAsset);

    // console.log('removing latest.json asset...');
    // await octokit.rest.repos.deleteReleaseAsset({
    //   owner,
    //   repo,
    //   asset_id: latestJsonAsset.id,
    // });

    // console.log('renaming release assets...');
    // const macArmInstaller = getAsset(assets, 'aarch64.dmg');
    // const macArmUpdater = getAsset(assets, 'aarch64.app.tar.gz');
    // const macIntelInstaller = getAsset(assets, 'x64.dmg');
    // const macIntelUpdater = getAsset(assets, 'x64.app.tar.gz');
    // const windowsExeInstaller = getAsset(assets, 'x64-setup.exe');
    // const windowsMsiInstaller = getAsset(assets, '.msi');
    // const linuxAppImageInstaller = getAsset(assets, 'amd64.AppImage');
    // const linuxRpmInstaller = getAsset(assets, 'x86_64.rpm');
    // const linuxDebInstaller = getAsset(assets, 'amd64.deb');

    // const macArmUpdaterName = `isos_updater_mac_${version}_aarch64.app.tar.gz`;
    // const macIntelUpdaterName = `isos_updater_mac_${version}_x64.app.tar.gz`;

    // renameUpdaterAsset(updater, 'darwin-aarch64', macArmUpdaterName);
    // renameUpdaterAsset(updater, 'darwin-x86_64', macIntelUpdaterName);

    // const newAssets = [
    //   {
    //     id: macArmInstaller.id,
    //     name: `isos_installer_mac_${version}_aarch64.dmg`,
    //     label: `ISOS installer for Mac (Apple Silicon)`,
    //   },
    //   {
    //     id: macArmUpdater.id,
    //     name: macArmUpdaterName,
    //   },
    //   {
    //     id: macIntelInstaller.id,
    //     name: `isos_installer_mac_${version}_x64.dmg`,
    //     label: `ISOS installer for Mac (Intel)`,
    //   },
    //   {
    //     id: macIntelUpdater.id,
    //     name: macIntelUpdaterName,
    //   },
    //   {
    //     id: windowsExeInstaller.id,
    //     name: `isos_installer_win_${version}_x64-setup.exe`,
    //     label: `ISOS installer for Windows (exe)`,
    //   },
    //   {
    //     id: windowsMsiInstaller.id,
    //     name: `isos_installer_win_${version}_en-US.msi`,
    //     label: `ISOS installer for Windows (msi)`,
    //   },
    //   {
    //     id: linuxAppImageInstaller.id,
    //     name: `isos_installer_nix_${version}_amd64.AppImage`,
    //     label: `ISOS installer for Linux (AppImage)`,
    //   },
    //   {
    //     id: linuxRpmInstaller.id,
    //     name: `isos_installer_nix_${version}_x86_64.rpm`,
    //     label: `ISOS installer for Linux (rpm)`,
    //   },
    //   {
    //     id: linuxDebInstaller.id,
    //     name: `isos_installer_nix_${version}_amd64.deb`,
    //     label: `ISOS installer for Linux (deb)`,
    //   },
    // ];

    // console.log(
    //   'new assets:',
    //   newAssets
    //     .sort((a, b) => a.name.localeCompare(b.name))
    //     .map((o) => ({
    //       label: o.label,
    //       name: o.name,
    //       id: o.id,
    //     })),
    // );

    // await Promise.all(
    //   newAssets.map(({ id, ...toUpdate }) =>
    //     octokit.rest.repos.updateReleaseAsset({
    //       owner,
    //       repo,
    //       asset_id: id,
    //       ...toUpdate,
    //     }),
    //   ),
    // );

    // console.log('publishing new latest.json...');
    // await octokit.rest.repos.uploadReleaseAsset({
    //   owner,
    //   repo,
    //   release_id: releaseId,
    //   name: 'latest.json',
    //   data: JSON.stringify(updater),
    // });

    // console.log('uploading latest.json as gist...');
    // const gistId = '12a09637fb047aa519cc2ea5fd662a8c';
    // const gistFileName = 'isos-update.json';
    // const release = await octokit.request(
    //   `GET /repos/${owner}/${repo}/releases/${releaseId}`,
    // );
    // updater.notes = String(release.data.body);
    // await octokit.rest.gists.update({
    //   gist_id: gistId,
    //   files: {
    //     [gistFileName]: {
    //       content: JSON.stringify(updater, null, 2),
    //     },
    //   },
    // });
    // console.log(
    //   `uploaded: https://gist.github.com/dmca-glasgow/${gistId}#file-${gistFileName}`,
    // );
  } catch (error) {
    setFailed(error as Error);
  }
}

// async function getVersion(): Promise<string> {
//   const filePath = `package.json`;
//   const contents = await readFile(filePath, 'utf-8');
//   const json = JSON.parse(contents);
//   return json.version;
// }

// function getAsset(assets: Asset[], endsWith: string) {
//   const result = assets.find((o) => o.name.endsWith(endsWith));
//   if (!result) {
//     throw new Error(`No asset ends with: ${endsWith}`);
//   }
//   return result;
// }

// async function getAssetTextContent(token: string, asset: Asset) {
//   const octokit = getOctokit(token);
//   const url = `GET /repos/${owner}/${repo}/releases/assets/${asset.id}`;
//   const res = await octokit.request(url, {
//     headers: {
//       Accept: 'application/octet-stream',
//     },
//   });
//   const contents = new TextDecoder('utf-8').decode(res.data);
//   return JSON.parse(contents) as VersionContent;
// }

// function renameUpdaterAsset(
//   updater: VersionContent,
//   platform: string,
//   name: string,
// ) {
//   const oldUrl = updater.platforms[platform].url;
//   const newUrl = `${path.parse(oldUrl).dir}/${name}`;
//   updater.platforms[platform].url = newUrl;
// }
