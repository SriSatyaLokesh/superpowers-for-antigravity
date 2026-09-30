#!/usr/bin/env node
const { runCli } = require('../src/cli.js');

const result = runCli(process.argv.slice(2));
if (result) {
  console.log(result);
}
