'use strict';

const args = process.argv;

const commitBuild = require('./src/commitBuild');
const createTag = require('./src/createTag');
const exportEnvVariables = require('./src/exportEnvVariables');

let version;
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
});

if (shouldCommitOnly) {
  commitBuild(version);
} else if (shouldExportOnly) {
  exportEnvVariables();
} else if (shouldCreateTagOnly) {
  createTag(version);
} else {
  exportEnvVariables((data) => {
    commitBuild(data.appVersion);
  });
}
