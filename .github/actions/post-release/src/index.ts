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

    const release = await octokit.request(
      `GET /repos/${owner}/${repo}/releases/${releaseId}`,
    );

    const releaseAssets = await octokit.request(
      `GET /repos/${owner}/${repo}/releases/${releaseId}/assets`,
    );
    const assets = releaseAssets.data as Asset[];

    console.log('adding version to macOS assets...');
    await Promise.all(
      assets
        .filter((asset) => asset.name.includes('.app'))
        .map((asset) =>
          octokit.rest.repos.updateReleaseAsset({
            owner,
            repo,
            asset_id: asset.id,
            name: `${asset.name.slice(0, 4)}_${version}_${asset.name.slice(5)}`,
          }),
        ),
    );

    console.log('removing latest.json...');
    const latestJsonAsset = assets.find(
      (o) => o.name === 'latest.json',
    ) as Asset;
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

    // const platformFiles = Object.entries(latestJsonContent.platforms).map(
    //   ([platform, o]) => ({
    //     platform,
    //     name: path.parse(o.url).base,
    //   }),
    // );

    // const assetsToRemove = assets.filter(
    //   (o) => !platformFiles.find((pf) => pf.name === o.name),
    // );

    // console.log('removing unwanted assets...');
    // await Promise.all(
    //   assetsToRemove.map((asset) =>
    //     octokit.rest.repos.deleteReleaseAsset({
    //       owner,
    //       repo,
    //       asset_id: asset.id,
    //     }),
    //   ),
    // );

    // console.log('renaming Windows asset...');
    // await updateAsset(
    //   'windows-x86_64',
    //   `isos-windows-${version}-x64-setup.nsis.zip`,
    //   'ISOS for Windows',
    // );

    // console.log('renaming Linux asset...');
    // await updateAsset(
    //   'linux-x86_64',
    //   `isos-linux-${version}-amd64.AppImage.tar.gz`,
    //   'ISOS for Linux (cross-distribution AppImage)',
    // );

    // console.log('renaming Intel Mac asset...');
    // await updateAsset(
    //   'darwin-x86_64',
    //   `isos-mac-${version}-x64.app.tar.gz`,
    //   'ISOS for macOS (Intel)',
    // );

    // console.log('renaming Apple Silicon Mac asset...');
    // await updateAsset(
    //   'darwin-aarch64',
    //   `isos-mac-${version}-aarch64.app.tar.gz`,
    //   'ISOS for macOS (Apple Silicon)',
    // );

    // Publish the release that was previously a draft
    await octokit.rest.repos.updateRelease({
      owner,
      repo,
      release_id: releaseId,
      draft: false,
    });

    // Edit updater gist file
    const latestJsonContent = await getAssetTextContent(latestJsonAsset);
    latestJsonContent.notes = String(release.data.body);

    await octokit.rest.gists.update({
      gist_id: gistId,
      files: {
        [gistFileName]: {
          content: JSON.stringify(latestJsonContent, null, 2),
        },
      },
    });

    async function getVersion(): Promise<string> {
      const filePath = `src-tauri/tauri.conf.json`;
      const contents = await readFile(filePath, 'utf-8');
      const json = JSON.parse(contents);
      return json.package.version;
    }

    async function getAssetTextContent(asset: Asset) {
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

    // async function updateAsset(
    //   platform: string,
    //   name: string,
    //   label: string,
    // ) {
    //   const asset = getAssetFromPlatform(platform);
    //   const url = latestJsonContent.platforms[platform].url;
    //   const newUrl = `${path.parse(url).dir}/${name}`;
    //   latestJsonContent.platforms[platform].url = newUrl;

    //   await octokit.rest.repos.updateReleaseAsset({
    //     owner,
    //     repo,
    //     asset_id: asset.id,
    //     name,
    //     label,
    //   });
    // }

    // function getAssetFromPlatform(platform: string) {
    //   const windows = platformFiles.find((o) => o.platform === platform);
    //   if (!windows) {
    //     throw new Error(`no platform found for: ${platform}`);
    //   }
    //   const asset = assets.find((o) => o.name === windows.name);
    //   if (!asset) {
    //     throw new Error(`no asset found for platform: ${platform}`);
    //   }
    //   return asset;
    // }
  } catch (error) {
    setFailed(error as Error);
  }
}
