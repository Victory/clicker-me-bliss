from time import sleep
from random import shuffle

from clickerft.cft import Cft


class Suite(Cft):

    def no_clicks(self):
        return int(self.clicksOwned.text) < 1

    def buy_some_clicks(self):
        targetClicksPerGeneration = 8
        targetMaxClicks = 8

        while int(self.clicksPerGeneration.text) < targetClicksPerGeneration:
            if int(self.clicksOwned.text) < 1:
                sleep(.5)
                continue
            self.increaseClicksPerGeneration.click()

        assert int(self.clicksPerGeneration.text) == targetClicksPerGeneration

        while int(self.maxClicks.text) < targetMaxClicks:
            if int(self.clicksOwned.text) < 1:
                sleep(.5)
                continue
            self.increaseMaxClicks.click()

        assert int(self.maxClicks.text) == targetMaxClicks

    def buy_all_resources(self, num=1):
        resources = ['r1', 'r2', 'r3']

        for ii in xrange(num):
            shuffle(resources)
            for resource in resources:
                self.click_r(resource)

    def buy_all_storage(self, num=1):
        for ii in xrange(num):
            self.sr1.click()
            self.sr2.click()
            self.sr3.click()

    def buy_all_items(self, num=1):
        for ii in xrange(num):
            self.i1.click()
            self.i2.click()
            self.i5.click()

    def buy_all_goods(self, num=1):
        for ii in xrange(num):
            self.g1.click()
            self.g2.click()
            self.g3.click()

    def buy_all_baracks(self):
        self.b1.click()
        self.b2.click()
        self.b3.click()

    def have_won(self):
        t1 = int(self.d1.text)
        if t1 < 100:
            return False

        t2 = int(self.d2.text)
        if t2 < 100:
            return False

        t3 = int(self.d3.text)
        if t3 < 100:
            return False
        return True

    def test_win(self):
        self.buy_some_clicks()

        for ii in xrange(10):
            self.buy_all_resources(20)
            self.buy_all_storage()
            self.buy_all_items()

        self.buy_all_goods()
        self.buy_all_baracks()

        while not self.have_won():
            sleep(.5)
            self.buy_all_resources(8)
            if self.gameState.text == 'gameOver':
                print "Game Over. Generation:", self.generation.text
                assert False


if __name__ == '__main__':
    Suite()
