import os
import json
from time import sleep

from selenium import webdriver

BASEDIR = os.path.dirname(os.getcwd())
HOME = "file://" + BASEDIR + "/src/"

clickwait = .05


class Suite2(object):
    """
    classify a test suite
    """

    elms = {}
    sleep = 1

    def __init__(self):
        self.run_tests()

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

        # check that all elms are in fact WebElement
        for elm in self.elms:
            assert type(self.elms[elm]) == \
                webdriver.remote.webelement.WebElement

    def click_r(self, name, num=1):
        for ii in xrange(num):
            self.elms[name].click()

    def click_sr(self, name, num=1):
        for ii in xrange(num):
            self.elms["s" + name].click()

    def click_sr_test(self, name, num=1):
        elm = self.elms["s" + name]
        ms = self.elms["ms" + name]
        start = int(ms.text)
        for ii in xrange(num):
            elm.click()
        fin = int(ms.text)
        assert fin == start + num

    def click_r_test(self, name, num=1):
        tr = self.elms["t" + name]
        start = int(tr.text)
        self.click_r(name, num)
        fin = int(tr.text)
        assert fin == start + num

    def click_i(self, name, num=1):
        elm = self.elms[name]
        for ii in xrange(num):
            elm.click()

    def click_i_test(self, name, num=1):
        oi = self.elms["o" + name]
        start = int(oi.text)
        self.click_i(name, num)
        fin = int(oi.text)
        assert fin == start + num

    def test_click_resources(self):
        self.click_r_test('r1', 1)
        self.click_r_test('r1', 9)

    def test_buy_storage(self):
        num_storage_to_buy = 2
        for ii in xrange(num_storage_to_buy):
            self.click_r_test('r1', int(self.psr1.text))
            self.click_sr('r1', 1)

    def test_buy_item(self):
        self.click_r_test('r1', int(self.pi1r1.text))
        self.click_i_test('i1', 1)
        start = int(self.tr1.text)
        sleep(self.sleep)
        now = int(self.tr1.text)
        assert  now == 1 + start

    def run_tests(self):
        for name in dir(self):
            if name[0:5] == 'test_':
                self.setUpTest()
                getattr(self, name)()
                self.tearDownTest()

    def __getattr__(self, name):
        if name in self.elms:
            return self.elms[name]
        msg = "'" + name + "'" + " not set"
        raise ValueError(msg)

if __name__ == '__main__':
    s2 = Suite2()
