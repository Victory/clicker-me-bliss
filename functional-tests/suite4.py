from clickerft.cft import Cft


class Suite4(Cft):

    def test_buy_max_clicks(self):
        price = int(self.pincreaseMaxClicks.text)
        start = int(self.maxClicks.text)
        for i in xrange(price):
            self.increaseMaxClicks.click()
        fin = int(self.maxClicks.text)
        assert 1 == fin - start

if __name__ == '__main__':
    Suite4()
