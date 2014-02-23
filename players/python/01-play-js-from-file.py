from os.path import dirname, abspath
import argparse

from selenium import webdriver


class JSPlayer(object):
    def __init__(self, url):
        self.url = url
        pass

    def play(self, file_name):
        fh = open(file_name, 'r')
        self.javascript = fh.read()
        fh.close()

        self.driver = webdriver.Firefox()
        self.driver.get(self.url)

        self.driver.find_element_by_id('cheatCodes').send_keys(self.javascript)
        self.driver.find_element_by_id('pausePlay').click()

if __name__ == '__main__':

    parser = argparse.ArgumentParser(
        description='Play a javascript file')
    parser.add_argument(
        'filepath', metavar='player.js', type=str,
        help='The path to the file containing javascript')
    parser.add_argument(
        '--url', dest="url", metavar='http://example.com/clicker.html',
        nargs="?",
        type=str,
        help='URL of the game page')
    args = parser.parse_args()

    if args.url:
        url = args.url
    else:
        url = "file://"
        url += dirname(abspath("../../" + __file__))
        url += "/src/index.html"

    player = JSPlayer(url)
    player.play(args.filepath)
