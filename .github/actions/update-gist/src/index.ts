import { setOutput, setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { exec } from '@actions/exec';
import { mkdirP } from '@actions/io';
import { readFile } from 'fs/promises';

const gistId = '12a09637fb047aa519cc2ea5fd662a8c'
const gistFileName = 'isos-update.json'

const workingDir = 'workspace'

const execOptions = {
  cwd: workingDir,
  // silent: true
}

run();

async function run() {
  try {
    await mkdirP(workingDir);

    const version = await getVersion();

    console.log('version:', version)

    // Download the release json file
    await exec('gh', [
      'release',
      'download',
      `v${version}`,
      '--pattern',
      'latest.json'
    ], execOptions)

    // Delete the json file from the release
    await exec('gh', [
      'release',
      'delete-asset',
      `v${version}`,
      'latest.json',
      '--yes'
    ])

    // Publish the release that was previously a draft
    await exec('gh', [
      'release',
      'edit',
      `v${version}`,
      "--draft=false"
    ])

    // Get permission to edit the gist file
    const octokit = getOctokit(String(process.env.ACCESS_TOKEN))

    // Edit updater gist file
    await octokit.rest.gists.update({
      gist_id: gistId,
      files: {
        [gistFileName]: {
          content: await readFile(`${workingDir}/latest.json`, 'utf-8')
        }
      }
    })

  } catch (error) {
    setFailed(error as Error);
  }
}

async function getVersion(): Promise<string> {
  const filePath = `src-tauri/tauri.conf.json`
  const contents = await readFile(filePath, 'utf-8')
  const json = JSON.parse(contents)
  return json.package.version;
}
