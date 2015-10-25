#!/usr/bin/env node
'use strict'

const fs = require('fs')
const meow = require('meow')
const stdin = require('get-stdin')
const updateNotifier = require('update-notifier')
const homoglyph = require('homoglyph')

const cli = meow(`
  Usage
    $ homoglyph <file>
    $ homoglyph <file> --reverse
    $ homoglyph <file> --probability 1-100
    $ echo <string> | homoglyph
    $ echo <string> | homoglyph --reverse
    $ echo <string> | homoglyph --probability 1-100
`, {
  boolean: 'reverse',
  string: 'probability',
  alias: {
    p: 'probability',
    r: 'reverse'
  }
})

updateNotifier({pkg: cli.pkg}).notify()

const input = cli.input[0]

if (!input && process.stdin.isTTY) {
  console.error('Expected a filepath')
  process.exit(1)
}

function init (text) {
  if (!cli.flags.reverse) {
    if (cli.flags.probability) {
      const probability = parseInt(cli.flags.probability, 10)
      if (probability > 0 && probability <= 100) {
        return homoglyph.encode(text, { probability })
      } else {
        console.error('Expected a a percentage number between 1 and 100')
        process.exit(1)
      }
    }
    return homoglyph.encode(text)
  } else {
    return homoglyph.decode(text)
  }
}

if (input) {
  const output = init(fs.readFileSync(input, 'utf8'))
  fs.writeFileSync(input, output)
} else {
  stdin().then(data => init(data)).then(output => console.log(output))
}
