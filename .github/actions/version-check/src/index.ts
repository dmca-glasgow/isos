import { setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { exec } from '@actions/exec';
import { mkdirP } from '@actions/io';
import { readFile } from 'fs/promises';

const workingDir = 'workspace'

run();

async function run() {
  try {
    await mkdirP(workingDir);

    const { owner, repo } = context.repo;
    const url = `https://github.com/${owner}/${repo}.git`

    await exec('git', ['clone', url, workingDir], { silent: true });
    const newVersion = await getVersion();
    console.log(`New version: ${newVersion}`);

    await exec('git', ['checkout', 'HEAD^'], { cwd: workingDir, silent: true });
    const oldVersion = await getVersion();
    console.log(`Old version: ${oldVersion}`);

    if (newVersion !== oldVersion) {
      const previousVersions = await getPreviousReleaseVersions()
      console.log(`Previous versions: ${previousVersions}`);

      if (previousVersions.includes(`v${newVersion}`)) {
        setFailed(`Error: version v${newVersion} has been released previously`);
        return
      }

      setOutput('has-version-change', `true`)
    }

  } catch (error) {
    setFailed(error as Error);
  }
}

async function getVersion(): Promise<string> {
  const filePath = `${workingDir}/src-tauri/tauri.conf.json`
  const contents = await readFile(filePath, 'utf-8')
  const json = JSON.parse(contents)
  return json.package.version;
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
