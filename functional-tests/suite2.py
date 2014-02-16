from time import sleep

from clickerft.cft import Cft


class Suite2(Cft):
    """
    classify a test suite
    """
    sleep = 1

    def test_click_resources(self):
        self.click_r_test('r1', 1)
        self.click_r_test('r1', 9)

    def test_buy_storage(self):
        num_storage_to_buy = 2
        for ii in xrange(num_storage_to_buy):
            self.click_r_test('r1', int(self.psr1.text))
            self.click_sr('r1', 1)

    def test_buy_item(self):
        self.click_r_test('r1', int(self.pi1r1.text))
        self.click_i_test('i1', 1)
        start = int(self.tr1.text)
        sleep(self.sleep)
        now = int(self.tr1.text)
        assert  now == 1 + start

    def test_buy_good(self):
        self.click_r_test('r1', int(self.pg1r1.text))
        starto = int(self.og1.text)
        startt = int(self.tg1.text)
        self.g1.click()
        assert int(self.og1.text) == starto + 1
        # hack because there is not a way just yet to see how many
        # goods it costs to create a good
        self.click_r_test('r1', 5)
        sleep(1.1)
        assert int(self.tg1.text) == startt + 1

    def test_buy_barrack(self):
        assert not self.b1.get_attribute('disabled')
        self.b1.click()
        assert self.b1.get_attribute('disabled')

        self.click_r_test('r1', 20)
        self.click_r_test('r2', 20)

        for i in xrange(15):
            self.g1.click()
            self.g2.click()
            for ii in xrange(10):
                self.r1.click()
                self.r2.click()
            if int(self.d1.text) > 0:
                break

        assert int(self.d1.text) == 1

if __name__ == '__main__':
    s2 = Suite2()
