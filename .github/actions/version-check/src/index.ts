import { getInput, setFailed, setOutput } from '@actions/core';
import { exec } from '@actions/exec';
import { context, getOctokit } from '@actions/github';
import { mkdirP } from '@actions/io';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const workingDir = 'workspace';

const execOptions = {
  cwd: workingDir,
  silent: true,
};

const { owner, repo } = context.repo;

run();

async function run() {
  try {
    await mkdirP(workingDir);

    const url = `https://github.com/${owner}/${repo}.git`;

    const dir = getInput('dir') || '';
    const filePath = join(workingDir, dir, 'package.json');
    console.log('Checking file path:', filePath);

    await exec('git', ['clone', url, '.'], execOptions);
    const newVersion = await getVersion(filePath);

    await exec('git', ['checkout', 'HEAD^'], execOptions);
    const oldVersion = await getVersion(filePath);

    console.log(`Old version: ${oldVersion}`);
    console.log(`New version: ${newVersion}`);
    setOutput('version', newVersion);

    if (newVersion !== oldVersion) {
      const previousVersions = await getPreviousReleaseVersions();
      // console.log(`Previous versions: ${previousVersions}`);

      if (previousVersions.includes(`v${newVersion}`)) {
        setFailed(
          `Error: version v${newVersion} has been released previously`,
        );
        return;
      }

      setOutput('has-version-change', 'true');
    }
  } catch (error) {
    setFailed(error as Error);
  }
}

async function getVersion(filePath: string): Promise<string> {
  const contents = await readFile(filePath, 'utf-8');
  return JSON.parse(contents).version;
}

async function getPreviousReleaseVersions() {
  const token = String(process.env.GH_TOKEN);
  const octokit = getOctokit(token);
  const res = await octokit.request(
    `GET /repos/${owner}/${repo}/releases`,
  );
  const releases = res.data as Array<{ name: string }>;
  return releases.map((o) => o.name);
}
