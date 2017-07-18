'use strict';

const args = process.argv;

const commitBuild = require('./src/commitBuild');
const createTag = require('./src/createTag');
const exportEnvVariables = require('./src/exportEnvVariables');

let version;
// default exportedFile
let exportedFile = 'jenkins.properties';

let shouldCommitOnly;
let shouldExportOnly;
let shouldCreateTagOnly;

args.forEach((val, index) => {
  if (val === '--commit' && args[index + 1]) {
    version = args[index + 1];
    shouldCommitOnly = true;
  }
  if (val === '--export') {
    const exportedFileTemp = args[index + 1];
    if (exportedFileTemp && !exportedFileTemp.startsWith('--')) {
      exportedFile = exportedFileTemp;
    }
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
  exportEnvVariables({exportedFile});
} else if (shouldCreateTagOnly) {
  createTag(version);
} else {
  exportEnvVariables({
    callback: (data) => {
      commitBuild(data.appVersion);
    },
    exportedFile,
  });
}
