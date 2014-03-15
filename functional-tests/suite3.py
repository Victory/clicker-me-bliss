from clickerft.cft import Cft


class Suite(Cft):

    def test_clicks_are_limited(self):
        clicksOwned = int(self.clicksOwned.text)
        # click max
        self.click_r_test('r1', clicksOwned)

        # wait to click on the next generation
        initGen = int(self.generation.text)
        while initGen == int(self.generation.text):
            self.r1.click()
        # clear the last remaining click
        self.r1.click()
        # get the number tr1
        start = int(self.tr1.text)
        # make sure we have gone 1 and only 1 generation
        assert initGen + 1 == int(self.generation.text)
        # click in that same generation
        self.r1.click()
        fin = int(self.tr1.text)
        # click should fail
        assert start == fin

    def test_max_clicks_decreases_on_click(self):
        start = int(self.pincreaseMaxClicks.text)
        self.increaseMaxClicks.click()
        fin = int(self.pincreaseMaxClicks.text)
        assert 1 == start - fin

if __name__ == '__main__':
    Suite()
