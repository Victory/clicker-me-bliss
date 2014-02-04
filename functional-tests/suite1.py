import os
from time import sleep

from selenium import webdriver

BASEDIR = os.path.dirname(os.getcwd())
HOME = "file://" + BASEDIR

driver = webdriver.Firefox()
driver.get(HOME + "/src/index.html")
assert driver.title == 'Clicker Me Bliss'
r1 = driver.find_element_by_id('r1')
for ii in xrange(10):
    r1.click()
    sleep(.3)
tr1 = driver.find_element_by_id('tr1')
assert tr1.text == '10'
driver.close()
