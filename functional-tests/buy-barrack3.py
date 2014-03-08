from clickerft.cft import Cft
from time import sleep


class Suite(Cft):

    def test_buy_barrack_3(self):

        while int(self.clicksPerGeneration.text) < 5:
            if int(self.clicksOwned.text) < 1:
                sleep(.5)
                continue
            self.increaseClicksPerGeneration.click()

        while int(self.msr3.text) < int(self.pg3r3.text):
            if int(self.clicksOwned.text) < 1:
                sleep(.5)
                continue
            self.click_r('r3', int(self.psr3.text))
            self.sr3.click()

        self.click_r_test('r3', int(self.pi5r3.text))

        self.click_r_test('r2', int(self.pi5r2.text))

        self.i5.click()

        while int(self.pg3r3.text) > int(self.tr3.text):
            if int(self.clicksOwned.text) < 1:
                sleep(.5)
                continue
            self.r3.click()

        assert int(self.pg3r3.text) <= int(self.tr3.text)

        while int(self.tr3.text) < int(self.pg3r3.text):
            sleep(.5)

        self.g3.click()
        assert int(self.og3.text) == 1
        sleep(1)
        assert int(self.tg3.text) > 0

        self.b3.click()

        while int(self.pb3g3.text) > 0:
            sleep(.5)

        sleep(1)

        assert int(self.d3.text) > 0
if __name__ == '__main__':
    Suite()
