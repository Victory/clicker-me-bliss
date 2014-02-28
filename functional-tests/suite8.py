# suite to test types of assertions
import sys
import cStringIO

from clickerft.cft import Cft


class Suite(Cft):
    def __init__(self):
        for name in dir(self):
            if name[0:5] == 'test_':
                getattr(self, name)()

    def test_asserts_equals(self):
        self.assertEquals(1, 1, "should equal")

    def test_fail_assert_equals(self):
        save_stdout = sys.stdout
        sys.stdout = cStringIO.StringIO()
        result = self.assertEquals(1, 2, "should fail")
        sys.stdout = save_stdout

        assert not result

if __name__ == '__main__':
    Suite()
