from clickerft.cft import Cft
from time import sleep


class Suite(Cft):

    def test_buy_item_5(self):
        while int(self.clicksPerGeneration.text) < 3:
            if int(self.clicksOwned.text) < 1:
                sleep(.5)
                continue
            self.increaseClicksPerGeneration.click()

        while int(self.tr2.text) < int(self.pi5r2.text):
            self.click_r_test('r2')

        while int(self.tr3.text) < int(self.pi5r3.text):
            self.click_r_test('r3')

        self.i5.click()
        assert int(self.oi5.text) == 1
        sleep(1)
        # todo put the modifier into the DOM to parse
        assert int(self.tr3.text) == 5


if __name__ == '__main__':
    Suite()
