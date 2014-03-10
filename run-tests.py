#!/usr/bin/env python

from subprocess import call
from glob import glob


errs = 0
for fn in glob("functional-tests/*py"):
    print "Running:", fn
    result = call(["python", fn])
    errs += result
    if result != 0:
        print fn, " exited with errors."
exit(errs)
