from clickerft.cft import Cft


class Suite3(Cft):

    def test_clicks_are_limited(self):
        clicksOwned = int(self.clicksOwned.text)
        while clicksOwned > 0:
            clicksOwned = int(self.clicksOwned.text)
            self.click_r('r1', clicksOwned)
        start = int(self.tr1.text)
        self.click_r('r1', 1)
        fin = int(self.tr1.text)
        assert start == fin

    def test_increase_max_clicks_decreases_on_click(self):
        start = int(self.pincreaseMaxClicks.text)
        self.increaseMaxClicks.click()
        fin = int(self.pincreaseMaxClicks.text)
        assert 1 == start - fin

if __name__ == '__main__':
    Suite3()
