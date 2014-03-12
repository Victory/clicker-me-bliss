from clickerft.cft import Cft


class Suite(Cft):

    def test_logs_are_pruned(self):
        max_logs = 5
        start = len(self.driver.find_elements_by_css_selector('#log p'))
        self.i1.click()
        fin = len(self.driver.find_elements_by_css_selector('#log p'))
        assert fin == start + 1

        for ii in xrange(30):
            self.i1.click()

        fin = len(self.driver.find_elements_by_css_selector('#log p'))
        assert fin == max_logs

if __name__ == '__main__':
    Suite()
