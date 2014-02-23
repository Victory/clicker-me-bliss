from clickerft.jsplayer import JsPlayer
from time import sleep


class JSuite(JsPlayer):

    def test_run_javascript(self):
        js = """
document.getElementById("r1").click()
"""
        self.run_javascript(js)
        assert int(self.tr1.text) > 0

    def test_js_with_state(self):
        js = """
cheats = document.cheats || {};
document.cheats = cheats;
if (! cheats.runR1 ) {
  cheats.runR1 = 0;
}

if (cheats.runR1 < 5) {
  document.getElementById("r1").click();
  cheats.runR1 +=  1;
  return;
} else {
  console.log('skipping r1');
}
"""
        self.run_javascript(js)

        # allow time for the cheat codes to run
        sleep(3)
        assert int(self.tr1.text) == 5

if __name__ == '__main__':
    JSuite()
