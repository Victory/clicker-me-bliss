Clicker Me Bliss
================
[![Build Status](https://travis-ci.org/Victory/clicker-me-bliss.svg?branch=master)](https://travis-ci.org/Victory/clicker-me-bliss)

A clicker (aka incremental) game designed to be played by bots or people.

Examples of Python code and javascript are in the repo.

The Python code uses selenium, which could also be written in ruby, php,
or any other language supported with selenium.

The Javascript can either be stateless or stateful. You can insert
your javscript code at the bottom of the page **before** clicking
play.


Install
===============
To play with your mouse you just open `index.html` and start clicking.

To play with javascript paste your javascript code into the cheat
codes box and press "click to start playing"

To see examples of playing with `python` `selenium` see the functional
tests. You can run a python selenium test with `python
functional-tests/whatever.py` You can run `pip install
requirements.txt` to install the current version of selenium.


How to Win
===============
You can win by by getting 100 of each of the 3 kinds of `defenders`.

Defenders (d1, d2, d3) are created by barracks (b1, b2, b3). Barracks
have a resource upkeep.

If any of your resources are negative you lose.


Beta Testers
==============
Beta testers please fork and make pull requests!
