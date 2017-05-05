'use strict';

const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const util = require('util');

let helperModule = {
  execute: execute,
  fatal: fatal,
  log: log,
  patchVersion: patchVersion,
  readFile: readFile,
  readFileAsJson: readFileAsJson,
};

module.exports = helperModule;


/**
 * Excecutes a bash command, and does a callback with stdout if provided
 * @param {string} commands The bash commands to be executed
 * @param {function} callbackStdout The callback function, taking the
    stdout as parameter
 * @return {undefined}
 */
function execute(commands, callbackStdout) {
  exec(commands, function(error, stdout, stderr) {
    if (error) {
      helperModule.fatal('exec error: ' + error);
      return;
    }

    if (stdout) {
      helperModule.log('stdout:\n' + stdout);
      if (callbackStdout) {
        callbackStdout(stdout);
      }
    }
    if (stderr) {
      helperModule.log('stderr:\n' + stderr);
    }
  });
}

/**
 * Stops the current node JS process
 * @param {string} message The message to be displayed, before ending
 * @return {undefined}
 */
function fatal(message) {
  if (message) {
    helperModule.log(message);
  }
  process.exit(1);
}

/**
 * Logs a message to the terminal
 * @param {string} message The message to be displayed
 * @return {undefined}
 */
function log(message) {
  util.log(message);
}

/**
 * Returns a patched version from given version string
 * @param {string} version The version to be patched
 * @return {string} New patched version from original version
 */
function patchVersion(version) {
  let versions = version.split('.');
  versions[2] = Number(versions[2]) + 1;

  return versions.join('.');
}

/**
 * Returns the content of a file
 * @param {string} file The relative path of the file
 * @return {string} Content of the file
 */
function readFile(file) {
  file = path.resolve(process.cwd(), file);

  try {
    return fs.readFileSync(file, {encoding: 'utf8'});
  } catch (e) {
    helperModule.fatal('Cannot read ' + file + '\n' + e.message);
  }
}

/**
 * Returns the content of a file as JSON
 * @param {string} file The relative path of the file
 * @return {JSON} JSON content of the file
 */
function readFileAsJson(file) {
  let output = helperModule.readFile(file);
  try {
    output = JSON.parse(output);
  } catch (e) {
    helperModule.fatal('Cannot read the specified file ' + file +
      ' as JSON: ' + e.message);
  }
  return output;
}
