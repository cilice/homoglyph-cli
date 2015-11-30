import childProcess from 'child_process'
import test from 'ava'
const pkg = require('./package.json')

test('main', t => {
  childProcess.execFile('./cli.js', ['README.md'], {
    cwd: __dirname
  }, (err, stdout) => {
    t.ifError(err)
  })
})

test('stdin', t => {
  childProcess.exec('cat README.md | ./cli.js', {
    cwd: __dirname
  }, (err, stdout) => {
    t.ifError(err)
  })
})

test('show help screen', t => {
  childProcess.execFile('./cli.js', ['--help'], (err, stdout) => {
    t.ifError(err)
    t.assert(/A CLI programm to use homoglyph library/.test(stdout), stdout)
  })
})

test('show version', t => {
  const regex = new RegExp(pkg.version)

  childProcess.execFile('./cli.js', ['--version'], (err, stdout) => {
    t.ifError(err)
    t.assert(regex.test(stdout), stdout)
  })
})
