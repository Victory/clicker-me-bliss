from clickerft.cft import Cft


class Suite5(Cft):
    def test_buy_clicks_per_generation(self):
        price = int(self.pincreaseMaxClicks.text)
        start = int(self.clicksPerGeneration.text)
        for i in xrange(price):
            self.increaseClicksPerGeneration.click()
        fin = int(self.clicksPerGeneration.text)
        assert 1 == fin - start

if __name__ == '__main__':
    Suite5()
