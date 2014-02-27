from time import sleep

from clickerft.cft import Cft


class Suite5(Cft):

    def test_buy_clicks_per_generation(self):
        price = int(self.pincreaseMaxClicks.text)
        start = int(self.clicksPerGeneration.text)
        clickwait = .5
        for i in xrange(price):
            while int(self.clicksOwned.text) < 1:
                sleep(clickwait)
            self.increaseClicksPerGeneration.click()
        fin = int(self.clicksPerGeneration.text)
        assert 1 == fin - start

if __name__ == '__main__':
    Suite5()
