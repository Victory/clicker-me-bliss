import os
import json
from pprint import pprint as pp

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
        self.driver = webdriver.Firefox()
        self.driver.get(HOME + "index.html")
        self.read_items()
        self.run_tests()

    def read_items(self):
        f = open(BASEDIR + "/src/js/items.js", 'r')
        items = f.read()
        items = items[items.find('{'):-1]
        items = json.loads(items)

        obj = items
        for kk, vv in obj.iteritems():
            self.elms[kk] = self.driver.find_element_by_id(kk)
            if vv['type'] == "resource":
                for prefix in ['t', 's', 'ps', 'ms']:
                    self.elms[prefix + kk] = \
                        self.driver.find_element_by_id(prefix + kk)

            if vv['type'] == "item":
                self.elms['o' + kk] = self.driver.find_element_by_id('o' + kk)
                for resource in vv['price']:
                    self.elms['p' + kk + resource] = \
                        self.driver.find_element_by_id('p' + kk + resource)

            if vv['type'] == 'good':
                for prefix in ['o', 't', 's']:
                    self.elms[prefix + kk] = \
                        self.driver.find_element_by_id(prefix + kk)
                for resource in vv['price']:
                    self.elms['p' + kk + resource] = \
                        self.driver.find_element_by_id('p' + kk + resource)

        # check that all elms are in fact WebElement
        for elm in self.elms:
            assert type(self.elms[elm]) == \
                webdriver.remote.webelement.WebElement

    def click_r(name, num=1):
        for ii in xrange(num):
            self.elms[name].click()

    def test_click_resource(self):
        self.click_r('r1', 1)
        assert self.tr1.text == '1'
        self.click_r('r1', 9)
        assert self.tr1.text == '10'

    def run_tests(self):
        for name in dir(self):
            if name[0:5] == 'test_':
                getattr(self, name)()

    def __getattr__(self, name):
        if name in self.elms:
            return self.elms[name]
        raise ValueError(name + " not set")

if __name__ == '__main__':
    s2 = Suite2()
