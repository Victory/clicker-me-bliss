from clickerft.cft import Cft


class Suite(Cft):
    """
    classify a test suite
    """
    sleep = 1

    def test_check_version_number(self):
        bugfix = self.driver.find_element_by_id('bugfix').text
        balance = self.driver.find_element_by_id('balance').text
        gameplay = self.driver.find_element_by_id('gameplay').text
        version = self.driver.find_element_by_id('version')

        version_string = bugfix + '.' + balance + '.' + gameplay
        assert version.text == version_string

if __name__ == '__main__':
    Suite()
