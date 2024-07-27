#!/usr/bin/env bash

# If version has been changed
# https://github.com/Makepad-fr/auto-release-on-version-bump-action
# https://javascript.plainenglish.io/how-to-run-skip-the-github-jobs-based-on-the-output-from-the-javascript-code-937038b75e21

# Update the release notes from the content of a file
# gh release edit v1.0 --notes-file /path/to/release_notes.md

# Download the updater json file
gh release download app-v0.0.2 --pattern 'latest.json' --output -

# Publish a release that was previously a draft
gh release edit app-v0.0.2 --draft=false

# overwriting file
gh gist edit gist-id -f gist-filename local-filename
