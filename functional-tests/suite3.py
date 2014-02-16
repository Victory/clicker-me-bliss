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


if __name__ == '__main__':
    Suite3()
