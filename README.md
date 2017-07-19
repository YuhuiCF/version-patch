# version-patch

Make commits and creating tags easier in Jenkins for front-end projects.

## Usage

Add module to your `package.json`
```javascript
// either in devDependencies, or dependencies:
{
  "version-patch": "https://github.com/YuhuiCF/version-patch.git" // additionally with #master or #X.XX.XX
}
```

Make sure that all your version updates creates a tag.
This module only works, if the tag is the same as version number.

To create an exported file with content APP_VERSION={{new version of the app}}.
If `--exportedFile` not indicated, then the default file is named with `jenkins.properties`
```shell
node node_modules/version-patch/ --export --exportedFile jenkins.properties
set -a
source jenkins.properties
set +a
```
Adding the parameter `--forcePatch 1` would force patching the version, even if no tag with current version is created.

To do a commit with all changed files, including changes in `package.json` with the new version 1.2.3, with a default [ci skip] message
```shell
node node_modules/version-patch/ --commit 1.2.3
```
By default, if no tag is created for the current version, the commit would not take place.
This might be the case that one manually makes a minor version update in a Pull Request.
If the Jenkins builds something that would need to be committed, then add the parameter `--forceCommit 1`.

To create a tag with the name version 1.2.3, and a default [ci skip] message
```shell
node node_modules/version-patch/ --tag 1.2.3
```
