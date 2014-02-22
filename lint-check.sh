#!/bin/sh

LINT="pocketlint"
cd "$(git rev-parse --show-toplevel)"
CWD=$(pwd)

JSPATH=$(git status --porcelain | grep ".*js" | awk '{print $2}')
HTMLPATH=$(git status --porcelain | grep ".*html" | awk '{print $2}')
CSSPATH=$(git status --porcelain | grep ".*css" | awk '{print $2}')
PYTHONPATH=$(git status --porcelain | grep ".*py" | awk '{print $2}')


if [ ! -z $JSPATH ]; then
    echo $JSPATH
    $LINT  $JSPATH
fi
if [ ! -z $HTMLPATH ]; then
    echo $HTMLPATH
    $LINT  $HTMLPATH
fi

if [ ! -z $PYTHONPATH ]; then
    echo $PYTHONPATH
    $LINT $PYTHONPATH
fi