import * as core from '@actions/core';
import * as github from '@actions/github';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import fs from 'fs';

run();

async function run(): Promise<void> {
    // try {
        const { owner, repo } = github.context.repo;

        console.log('owner:', owner)
        console.log('repo:', repo)

        await exec.exec('git', ['--version']);

        await io.mkdirP('workspace');
        await exec.exec('git', ['clone', `https://github.com/${owner}/${repo}.git`, 'workspace'], { silent: true });

        // const newVersion: string = getVersion();
        // console.log(`New version: ${newVersion}`);

        // await exec.exec('git', ['checkout', 'HEAD^'], { cwd: 'workspace', silent: true });
        // const oldVersion: string = getVersion();
        // console.log(`Old version: ${oldVersion}`);

        // if (newVersion === oldVersion) {
        //   core.setOutput("has_version_increment", 'false');
        // } else {
        //   core.setOutput("has_version_increment", 'true');
        // }

    // } catch (error) {
    //     core.setFailed(error as Error);
    // }
}

function getVersion(): string {
  return JSON.parse(fs.readFileSync('./workspace/src-tauri/tauri.conf.json', 'utf-8')).package.version;
}
