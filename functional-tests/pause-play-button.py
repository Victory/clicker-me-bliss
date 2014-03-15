from clickerft.cft import Cft


class Suite(Cft):

    def test_pause_play_button(self):
        """
        buy clicks until  we have 50 max clicks of 50
        and 10 clicks/sec
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
