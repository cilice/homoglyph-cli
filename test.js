import childProcess from 'child_process'
import test from 'ava'
const pkg = require('./package.json')

test('main', t => {
  t.plan(1)

  childProcess.execFile('./cli.js', ['README.md'], {
    cwd: __dirname
  }, (err, stdout) => {
    t.ifError(err)
  })
})

test('show error if no path is specified', t => {
  t.plan(1)

  const cp = childProcess.spawn('./cli.js', {
    stdio: [process.stdin, null, null]
  })

  cp.stderr.setEncoding('utf8')
  cp.stderr.on('data', data => {
    t.assert(/Expected a filepath/.test(data), data)
  })
})

test('stdin', t => {
  t.plan(1)

  childProcess.exec('cat README.md | ./cli.js', {
    cwd: __dirname
  }, (err, stdout) => {
    t.ifError(err)
  })
})

test('show help screen', t => {
  t.plan(2)

  childProcess.execFile('./cli.js', ['--help'], (err, stdout) => {
    t.ifError(err)
    t.assert(/A CLI programm to use homoglyph library/.test(stdout), stdout)
  })
})

test('show version', t => {
  t.plan(2)
  const regex = new RegExp(pkg.version)

  childProcess.execFile('./cli.js', ['--version'], (err, stdout) => {
    t.ifError(err)
    t.assert(regex.test(stdout), stdout)
  })
})
