import { setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { exec } from '@actions/exec';
import { mkdirP } from '@actions/io';
import { readFile } from 'fs/promises';

run();

const gistId = '12a09637fb047aa519cc2ea5fd662a8c'

async function run() {
  try {
    await exec('ls', ['-R', 'src-tauri/target/release'])

    // Download the updater json file
    // gh release download app-v0.0.2 --pattern 'latest.json' --output -

    // Publish a release that was previously a draft
    // gh release edit app-v0.0.2 --draft=false

    // overwriting file
    // gh gist edit gist-id -f gist-filename local-filename

  } catch (error) {
    setFailed(error as Error);
  }
}

async function getPreviousReleaseVersions() {
  let output = ''

  await exec('gh', ['release', 'list', '--json', 'name'], {
    listeners: {
      stdout: (data) => {
        output += data.toString()
      }
    }
  });

  const json = JSON.parse(output) as Array<{name: string}>

  return json.map(o => o.name)
}
