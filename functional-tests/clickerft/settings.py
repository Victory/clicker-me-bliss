from os.path import dirname, realpath

BASEDIR = dirname(dirname(dirname(realpath(__file__))))
HOME = "file://" + BASEDIR + "/src/"
