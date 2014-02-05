import os
from time import sleep

from selenium import webdriver

BASEDIR = os.path.dirname(os.getcwd())
HOME = "file://" + BASEDIR

clickwait = .05

# create a driver
driver = webdriver.Firefox()

# get the homepage
driver.get(HOME + "/src/index.html")
# check the homepage title
assert driver.title == 'Clicker Me Bliss'


# get i1 so we can see how much it costs
psr1 = driver.find_element_by_id('psr1')

# click on the r1 button enough times to buy s1
r1 = driver.find_element_by_id('r1')
for ii in xrange(int(psr1.text)):
    r1.click()
    sleep(clickwait)
tr1 = driver.find_element_by_id('tr1')
# make sure we have 10 new resouces
assert int(tr1.text) == int(psr1.text)

# do the same for r2 as was done with r1r2 = driver.find_element_by_id('r2')
r2 = driver.find_element_by_id('r2')
for ii in xrange(10):
    r2.click()
    sleep(clickwait)
tr2 = driver.find_element_by_id('tr2')
assert tr2.text == '10'

# buy s1 and make sure the price went up
msr1 = driver.find_element_by_id('msr1')
msr1_start_price = msr1.text
sr1 = driver.find_element_by_id('sr1')
sr1.click()
assert int(msr1.text) > int(msr1_start_price)

# do the same for s2 as you did for s1
msr2 = driver.find_element_by_id('msr2')
msr2_start_price = msr2.text
sr2 = driver.find_element_by_id('sr2')
sr2.click()
assert int(msr2.text) > int(msr2_start_price)

# assert we can't buy i1 without enought r1
assert int(tr1.text) == 0
i1 = driver.find_element_by_id('i1')
i1.click()
oi1 = driver.find_element_by_id('oi1')
assert 0 == int(oi1.text)

# make sure we don't have any tr1 so buy test is accurate
assert int(tr1.text) == 0
# click on the r1 button enough times to buy i1
pi1r1 = driver.find_element_by_id('pi1r1')
for ii in xrange(int(pi1r1.text)):
    r1.click()
    sleep(clickwait)
# make sure we have the new item
i1.click()
assert int(oi1.text) == 1

# wait a couple seconds and make sure we are generating r1
sleep(2)
assert int(tr1.text) > 0


# close the driver
driver.close()
