#!/bin/sh

LINT="pocketlint"
cd "$(git rev-parse --show-toplevel)"
CWD=$(pwd)
JSPATH="./src/js/*js"
HTMLPATH="./src/*.html"
CSSPATH="./src/css/*css"

$LINT  $JSPATH
$LINT  $HTMLPATH
