var Gitems = {
  r1: {
    name: 'resource 1',
    type: 'resource',
    total: 1,
    resource: 'r1'
  },
  r2: {
    name: 'resource 2',
    type: 'resource',
    total: 2,
    resource: 'r2'
  },
  i1: {
    name: '1 more clicks',
    type: 'item',
    price: {
      r1: 5
    },
    resource: 'r1',
    modifier: 1,
    priceJump: 1.1,
    owned: 0
  },
  g1: {
    name: "convert resource 1 to good 1",
    type: 'good',
    price: {
      r1: 5
    },
    resource: 'r1',
    resourceCost: 5,
    winRate: 0.5,
    good: 'g1',
    modifier: 1,
    priceJump: 1.1,
    owned: 0,
    total: 0
  }
};