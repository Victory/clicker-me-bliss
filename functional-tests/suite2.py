import os
import json

from selenium import webdriver

BASEDIR = os.path.dirname(os.getcwd())
HOME = "file://" + BASEDIR + "/src/"

clickwait = .05


class Suite2(object):
    """
    classify a test suite
    """

    elms = {}

    def __init__(self):

        self.read_items()
        return

        self.driver = webdriver.Firefox()
        self.driver.get(HOME + "index.html")
        self.elms['psr1'] = self.driver.find_element_by_id('psr1')

    def read_items(self):
        f = open(BASEDIR + "/src/js/items.js", 'r')
        items = f.read()
        items = items[items.find('{'):-1]
        items = json.loads(items)

        obj = items
        for ka, va in obj.iteritems():
            print ka, va
            for kb, vb in va.iteritems():
                if type(vb) == dict:
                    for kc, vc in vb.iteritems():
                        print kc, vc
                print '  ' + kb, vb

    def __getattr__(self, name):
        if name in self.elms:
            return self.elms[name]
        raise ValueError(name + " not set")

if __name__ == '__main__':
    s2 = Suite2()
