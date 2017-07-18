'use strict';

const helper = require('./helper');

module.exports = createTag;


/**
 * Creates a tag for the Jenkins build, with appVersion as parameter
 * with git tag options: -a -f
 * Remember to push the tag with git push --tags
 * @param {string} appVersion - The new version of the application
 * @return {undefined}
 */
function createTag(appVersion) {
  if (!appVersion) {
    return helper.fatal('appVersion for createTag must be given');
  }

  let commands = [];

  commands.push('git tag -a -f -m ' +
    '"[ci skip] The TAG was created after a successful Jenkins Build" ' +
    appVersion
  );

  helper.execute(commands.join(' && '));
}
