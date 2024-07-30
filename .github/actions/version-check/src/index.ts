import { setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { exec } from '@actions/exec';
import { mkdirP } from '@actions/io';
import { readFile } from 'fs/promises';

run();

async function run() {
  const newVersion = await getVersion();
  console.log(`New version: ${newVersion}`);

  let cmdOutput = ''
  const options = {
    listeners: {
      stdout: (data) => {
        cmdOutput += data.toString()
      }
    }
  }

  await exec('gh', ['release', 'list', '--json', 'name']);

  console.log('cmdOutput:', cmdOutput)

  // git blame -L '/version/',+1 -- src-tauri/tauri.conf.json
  // git log -L 10,11:src-tauri/tauri.conf.json
  // gh release list --json name

  // try {
  //   const { owner, repo } = context.repo;
  //   const url = `https://github.com/${owner}/${repo}.git`

  //   await mkdirP('workspace');
  //   await exec('git', ['clone', url, 'workspace'], { silent: true });

  //   const newVersion = await getVersion();
  //   // console.log(`New version: ${newVersion}`);

  //   await exec('git', ['checkout', 'HEAD^'], { cwd: 'workspace', silent: true });
  //   const oldVersion = await getVersion();
  //   // console.log(`Old version: ${oldVersion}`);

  //   setOutput('has-version-change', `${newVersion !== oldVersion}`)

  // } catch (error) {
  //   setFailed(error as Error);
  // }
}

async function getVersion(): Promise<string> {
  const filePath = './src-tauri/tauri.conf.json'
  const contents = await readFile(filePath, 'utf-8')
  const json = JSON.parse(contents)
  return json.package.version;
}
