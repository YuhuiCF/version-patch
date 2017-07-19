'use strict';

const args = process.argv;

const commitBuild = require('./src/commitBuild');
const createTag = require('./src/createTag');
const exportEnvVariables = require('./src/exportEnvVariables');

let version;
// default exportedFile
let exportedFile = 'jenkins.properties';
let forceCommit = false;
let forcePatch = false;

let shouldCommitOnly;
let shouldExportOnly;
let shouldCreateTagOnly;

args.forEach((val, index) => {
  if (val === '--commit' && args[index + 1]) {
    version = args[index + 1];
    shouldCommitOnly = true;
  }
  if (val === '--export') {
    shouldExportOnly = true;
  }
  if (val === '--tag' && args[index + 1]) {
    version = args[index + 1];
    shouldCreateTagOnly = true;
  }

  if (val === '--exportedFile' && args[index + 1]) {
    exportedFile = args[index + 1];
  }
  if (val === '--forcePatch' && args[index + 1]) {
    forcePatch = true;
  }
  if (val === '--forceCommit' && args[index + 1]) {
    forceCommit = true;
  }
});

if (shouldCommitOnly) {
  commitBuild(version, forceCommit);
} else if (shouldExportOnly) {
  exportEnvVariables({
    exportedFile,
    forcePatch,
  });
} else if (shouldCreateTagOnly) {
  createTag(version);
} else {
  exportEnvVariables({
    callback: (data) => {
      commitBuild(data.appVersion, forceCommit);
    },
    exportedFile,
    forcePatch,
  });
}
