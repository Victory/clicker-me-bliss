from clickerft.jsplayer import JsPlayer


class JSuite(JsPlayer):

    def test_run_javascript(self):
        js = """
document.getElementById("r1").click()
"""
        self.run_javascript(js)
        assert int(self.tr1.text) > 0

if __name__ == '__main__':
    JSuite()
