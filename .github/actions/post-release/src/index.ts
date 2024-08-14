import { setFailed } from '@actions/core';
import { getOctokit } from '@actions/github';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

// const workingDir = 'workspace';
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
    const releaseId = String(process.env.RELEASE_ID);

    const octokit = getOctokit(token);
    const version = await getVersion();

    const releaseAssets = await octokit.request(
      `GET /repos/${owner}/${repo}/releases/${releaseId}/assets`,
    );
    const assets = releaseAssets.data as Asset[];

    const latestJsonContent = await getLatestJson(assets);

    const platformFiles = Object.entries(latestJsonContent.platforms).map(
      ([platform, o]) => ({
        platform,
        name: path.parse(o.url).base,
      }),
    );

    const assetsToRemove = assets.filter(
      (o) => !platformFiles.find((pf) => pf.name === o.name),
    );

    console.log('removing unwanted assets...');
    await Promise.all(
      assetsToRemove.map((asset) =>
        octokit.request(
          `DELETE /repos/${owner}/${repo}/releases/assets/${asset.id}`,
        ),
      ),
    );

    console.log('renaming Windows asset...');
    await updateAsset(
      'windows-x86_64',
      `isos-windows-${version}-x64-setup.nsis.zip`,
      'ISOS for Windows',
    );

    console.log('renaming Linux asset...');
    await updateAsset(
      'linux-x86_64',
      `isos-linux-${version}-amd64.AppImage.tar.gz`,
      'ISOS for Linux (cross-distribution AppImage)',
    );

    console.log('renaming Intel Mac asset...');
    await updateAsset(
      'darwin-x86_64',
      `isos-mac-${version}-x64.app.tar.gz`,
      'ISOS for macOS (Intel)',
    );

    console.log('renaming Apple Silicon Mac asset...');
    await updateAsset(
      'darwin-aarch64',
      `isos-mac-${version}-aarch64.app.tar.gz`,
      'ISOS for macOS (Apple Silicon)',
    );

    // Publish the release that was previously a draft
    await octokit.request(
      `PATCH /repos/${owner}/${repo}/releases/${releaseId}`,
      {
        draft: false,
        // body: 'TODO',
      },
    );

    // Edit updater gist file
    await octokit.rest.gists.update({
      gist_id: gistId,
      files: {
        [gistFileName]: {
          content: JSON.stringify(latestJsonContent),
        },
      },
    });

    async function getVersion(): Promise<string> {
      const filePath = `src-tauri/tauri.conf.json`;
      const contents = await readFile(filePath, 'utf-8');
      const json = JSON.parse(contents);
      return json.package.version;
    }

    async function getLatestJson(assets: Asset[]) {
      const latestAsset = assets.find(
        (o) => o.name === 'latest.json',
      ) as Asset;
      const res = await octokit.request(
        `GET /repos/${owner}/${repo}/releases/assets/${latestAsset.id}`,
        {
          headers: {
            Accept: 'application/octet-stream',
          },
        },
      );
      const contents = new TextDecoder('utf-8').decode(res.data);
      return JSON.parse(contents) as VersionContent;
    }

    async function updateAsset(
      platform: string,
      name: string,
      label: string,
    ) {
      const asset = getAssetFromPlatform(platform);
      const url = latestJsonContent.platforms[platform].url;
      const newUrl = `${path.parse(url).dir}/${name}`;
      latestJsonContent.platforms[platform].url = newUrl;

      await octokit.request(
        `PATCH /repos/${owner}/${repo}/releases/assets/${asset.id}`,
        {
          name,
          label,
        },
      );
    }

    function getAssetFromPlatform(platform: string) {
      const windows = platformFiles.find((o) => o.platform === platform);
      if (!windows) {
        throw new Error(`no platform found for: ${platform}`);
      }
      const asset = assets.find((o) => o.name === windows.name);
      if (!asset) {
        throw new Error(`no asset found for platform: ${platform}`);
      }
      return asset;
    }
  } catch (error) {
    setFailed(error as Error);
  }
}
