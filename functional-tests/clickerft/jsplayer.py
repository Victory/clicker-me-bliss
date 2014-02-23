from selenium import webdriver

from clickerft.cft import Cft
from settings import HOME


class JsPlayer(Cft):

    def __init__(self):
        """Set up a player who plays via javascript

        js -- is a string containing the javascript code
        """

        super(JsPlayer, self).__init__()

    def run_javascript(self, javascript):
        self.javascript = javascript
        self.driver.find_element_by_id('cheatCodes').send_keys(self.javascript)
        self.driver.find_element_by_id('pausePlay').click()

    def setUpTest(self):
        self.driver = webdriver.Firefox()
        self.driver.get(HOME + "index.html")
        self.read_items()
