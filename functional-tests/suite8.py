# suite to test types of assertions
from clickerft.cft import Cft


class Suite(Cft):
    def __init__(self):
        for name in dir(self):
            if name[0:5] == 'test_':
                getattr(self, name)()

    def test_asserts_equals(self):
        self.assertEquals(1, 1, "should equal")

    def test_fail_assert_equals(self):
        result = self.assertEquals(1, 2, "should fail")
        assert not result

if __name__ == '__main__':
    Suite()
