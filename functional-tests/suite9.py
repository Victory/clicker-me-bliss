from selenium import webdriver

from clickerft.cft import Cft


class Suite(Cft):
    def setUpTest(self):
        self.driver = webdriver.Firefox()
        self.driver.get(self.home + "index.html")
        self.read_items()

    def test_cheat_function_is_written_to_div(self):
        cc = self.driver.find_element_by_id("cheatCodes")
        cf = self.driver.find_element_by_id("runningCheat")

        function_string = "console.log('yay!')"
        cc.send_keys(function_string)
        self.driver.find_element_by_id('pausePlay').click()

        assert cf.text == function_string

if __name__ == '__main__':
    Suite()
