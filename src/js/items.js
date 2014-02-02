var Gitems = {
  r1: {
    name: 'resource 1',
    type: 'resource',
    total: 1,
    resource: 'r1',
    maxStorage: 10,
    maxStoragePrice: 5,
    maxStorageJump: 1.3,
    maxStoragePriceJump: 1.2
  },
  r2: {
    name: 'resource 2',
    type: 'resource',
    total: 2,
    resource: 'r2',
    maxStorage: 10,
    maxStoragePrice: 5,
    maxStorageJump: 2.0,
    maxStoragePriceJump: 1.2
  },
  i1: {
    name: '1 more clicks on r1',
    type: 'item',
    price: {
      r1: 5
    },
    resource: 'r1',
    modifier: 1,
    priceJump: 1.1,
    owned: 0
  },
  i2: {
    name: '1 more clicks on r2',
    type: 'item',
    price: {
      r2: 5
    },
    resource: 'r2',
    modifier: 1,
    priceJump: 1.1,
    owned: 0
  },
  i3: {
    name: '1 more clicks on r2',
    type: 'item',
    price: {
      r1: 5,
      r2: 5
    },
    resource: 'r1',
    modifier: 2,
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
    total: 0,
    maxStorage: 500
  }
};