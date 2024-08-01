import { setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { exec } from '@actions/exec';
import { mkdirP } from '@actions/io';
import { readFile } from 'fs/promises';

const gistId = 'https://gist.github.com/dmca-glasgow/12a09637fb047aa519cc2ea5fd662a8c'

const workingDir = 'workspace'

const execOptions = {
  cwd: workingDir,
  // silent: true
}

run();

async function run() {
  try {
    await mkdirP(workingDir);

    // const version = await getVersion();
    const version = '0.0.15'

    console.log('version:', version)

    // Download the release json file
    await exec('gh', [
      'release',
      'download',
      `v${version}`,
      '--pattern',
      'latest.json'
    ], execOptions)

    console.log('json:', await readFile(`${workingDir}/latest.json`, 'utf-8'))

    // Delete the json file from the release
    // await exec('gh', [
    //   'release',
    //   'delete-asset',
    //   `v${version}`,
    //   'latest.json',
    //   '--yes'
    // ])

    // Publish the release that was previously a draft
    await exec('gh', [
      'release',
      'edit',
      `v${version}`,
      "--draft=false"
    ])

    // Overwrite updater gist file
    await exec('gh', [
      'gist',
      'edit',
      gistId,
      '-f',
      'isos-update.json',
      'latest.json'
    ], execOptions)

  } catch (error) {
    setFailed(error as Error);
  }
}

// async function getVersion(): Promise<string> {
//   const filePath = `src-tauri/tauri.conf.json`
//   const contents = await readFile(filePath, 'utf-8')
//   const json = JSON.parse(contents)
//   return json.package.version;
// }
