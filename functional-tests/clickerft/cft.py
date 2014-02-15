import os
import json

from selenium import webdriver

#BASEDIR = os.path.dirname(os.getcwd())
#HOME = "file://" + BASEDIR + "/src/"
from settings import BASEDIR, HOME

class Cft(object):
    elms = {}

    def __init__(self):
        self.run_tests()

    def run_tests(self):
        for name in dir(self):
            if name[0:5] == 'test_':
                self.setUpTest()
                getattr(self, name)()
                self.tearDownTest()

    def setUpTest(self):
        self.driver = webdriver.Firefox()
        self.driver.get(HOME + "index.html")
        self.read_items()

    def tearDownTest(self):
        self.driver.close()


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

            if vv['type'] == 'barrack':
                self.elms[vv['unit']] = \
                    self.driver.find_element_by_id(vv['unit'])

        # check that all elms are in fact WebElement
        for elm in self.elms:
            assert type(self.elms[elm]) == \
                webdriver.remote.webelement.WebElement
