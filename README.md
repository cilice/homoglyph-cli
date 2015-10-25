# homoglyph-cli [![Build Status](https://travis-ci.org/cilice/homoglyph-cli.svg?branch=master)](https://travis-ci.org/cilice/homoglyph-cli)

A port of [mimic](https://github.com/reinderien/mimic) to node.js.

It's inspired by this terrible idea floating around:

> MT: Replace a semicolon (;) with a greek question mark (;) in your friend&#39;s C# code and watch them pull their hair out over the syntax error

>  [Peter Ritchie (@peterritchie) November 16, 2014](https://twitter.com/peterritchie/status/534011965132120064)


## Install

```sh
$ npm install --save homoglyph-cli
```

##Usage

```sh
$ homoglyph <file>
$ homoglyph <file> --reverse
$ homoglyph <file> --probability 1-100
$ echo <string> | homoglyph
$ echo <string> | homoglyph --reverse
$ echo <string> | homoglyph --probability 1-100
```
