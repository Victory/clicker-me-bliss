from clickerft.cft import Cft
from time import sleep


class Suite(Cft):

    def test_buy_item_4(self):
        while int(self.clicksPerGeneration.text) < 2:
            if int(self.clicksOwned.text) < 1:
                sleep(.5)
                continue
            self.increaseClicksPerGeneration.click()

        while int(self.tr1.text) < int(self.pi4r1.text):
            self.click_r_test('r1')

        while int(self.tr2.text) < int(self.pi4r2.text):
            self.click_r_test('r2')

        self.i4.click()
        assert int(self.oi4.text) == 1
        sleep(1)
        # todo put the modifier into the DOM to parse
        assert int(self.tr1.text) == 5

        pass


if __name__ == '__main__':
    Suite()
