from clickerft.cft import Cft
from time import sleep


class Suite(Cft):

    def test_buy_target_max_and_gen(self):
        """
        buy clicks until  we have target max clicks
        and targe clicks/sec
        """
        targetGen = 4
        while int(self.clicksPerGeneration.text) < targetGen:
            clicksOwned = int(self.clicksOwned.text)
            priceGen = int(self.pincreaseClicksPerGeneration.text)
            for ii in xrange(min(clicksOwned, priceGen)):
                self.increaseClicksPerGeneration.click()
        assert int(self.clicksPerGeneration.text) == targetGen

        targetMax = 12
        while int(self.maxClicks.text) < targetMax:
            clicksOwned = int(self.clicksOwned.text)
            priceMax = int(self.pincreaseMaxClicks.text)
            for ii in xrange(min(clicksOwned, priceMax)):
                self.increaseMaxClicks.click()
        assert int(self.maxClicks.text) == targetMax


if __name__ == '__main__':
    Suite()
