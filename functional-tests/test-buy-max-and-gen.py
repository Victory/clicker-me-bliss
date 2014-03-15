from time import sleep

from clickerft.cft import Cft


class Suite(Cft):

    def test_buy_target_max_and_gen(self):
        """
        buy clicks until  we have target max clicks
        and targe clicks/sec
        """
        clickwait = .5
        targetGen = 3
        while int(self.clicksPerGeneration.text) < targetGen:
            clicksOwned = int(self.clicksOwned.text)
            priceGen = int(self.pincreaseClicksPerGeneration.text)
            for ii in xrange(min(clicksOwned, priceGen)):
                while int(self.clicksOwned.text) < 1:
                    sleep(clickwait)
                self.increaseClicksPerGeneration.click()
        assert int(self.clicksPerGeneration.text) == targetGen

        targetMax = 7
        while int(self.maxClicks.text) < targetMax:
            priceMax = int(self.pincreaseMaxClicks.text)
            for ii in xrange(priceMax):
                while int(self.clicksOwned.text) < 1:
                    sleep(clickwait)
                self.increaseMaxClicks.click()
        assert int(self.maxClicks.text) == targetMax


if __name__ == '__main__':
    Suite()
