#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

let linkName = '_';
if (process.argv.length > 2) {
  linkName = process.argv[2];
}
let targetDirRelativePath = '/'; // Relative to root
if (process.argv.length > 3) {
  rootBase = process.argv[3];
}

var root = process.cwd().replace(/\\/g, '/');
var nodeModulesIndex = root.lastIndexOf('/node_modules/');
if (nodeModulesIndex !== -1) {
  root = root.slice(0, nodeModulesIndex)
}
root = path.resolve(root);

var target = path.join(root, targetDirRelativePath);
var link = path.join(root, 'node_modules', linkName);

try {
  var existingReal = path.resolve(fs.realpathSync(link));
} catch (e) {
  fs.symlinkSync(target, link, 'junction');
  process.exit(0);
}
if (existingReal && existingReal !== target) {
  throw new Error(`${link} is already being used. If you changed the target path, remove the link and try again.`)
}
