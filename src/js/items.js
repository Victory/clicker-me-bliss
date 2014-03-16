var Gitems = {
  "generation": {
    "type": "generation",
    "total": 0
  },
  "maxClicks" : {
    "type": "maxClicks",
    "total": 5
  },
  "clicksOwned": {
    "type": "clicksOwned",
    "total": 5
  },
  "increaseMaxClicks" : {
    "type": "increaseMaxClicks",
    "increase": "maxClicks",
    "total": 0,
    "initPrice": 10,
    "price": 10,
    "priceJump": 1.5
  },
  "increaseClicksPerGeneration" : {
    "type": "increaseClicksPerGeneration",
    "total": 1,
    "price": 10,
    "initPrice": 10,
    "priceJump": 1.5
  },
  "r1": {
    "name": "resource 1",
    "type": "resource",
    "total": 0,
    "resource": "r1",
    "maxStorage": 10,
    "maxStoragePrice": 5,
    "maxStorageJump": 1.3,
    "maxStoragePriceJump": 1.2
  },
  "r2": {
    "name": "resource 2",
    "type": "resource",
    "total": 0,
    "resource": "r2",
    "maxStorage": 10,
    "maxStoragePrice": 5,
    "maxStorageJump": 2.0,
    "maxStoragePriceJump": 1.2
  },
  "r3": {
    "name": "resource 3",
    "type": "resource",
    "total": 0,
    "resource": "r3",
    "maxStorage": 5,
    "maxStoragePrice": 2,
    "maxStorageJump": 2.0,
    "maxStoragePriceJump": 1.2
  },
  "i1": {
    "name": "1 more clicks on r1",
    "type": "item",
    "price": {
      "r1": 5
    },
    "resource": "r1",
    "modifier": 1,
    "priceJump": 1.1,
    "owned": 0
  },
  "i2": {
    "name": "1 more clicks on r2",
    "type": "item",
    "price": {
      "r2": 5
    },
    "resource": "r2",
    "modifier": 1,
    "priceJump": 1.1,
    "owned": 0
  },
  "i3": {
    "name": "1 more clicks on r2",
    "type": "item",
    "price": {
      "r1": 5,
      "r2": 5
    },
    "resource": "r1",
    "modifier": 2,
    "priceJump": 1.1,
    "owned": 0
  },
  "i4": {
    "name": "5 more clicks on r1",
    "type": "item",
    "price": {
      "r1": 30,
      "r2": 30
    },
    "resource": "r1",
    "modifier": 5,
    "priceJump": 2.0,
    "owned": 0
  },
  "i5": {
    "name": "5 more clicks on r3",
    "type": "item",
    "price": {
      "r2": 50,
      "r3": 50
    },
    "resource": "r3",
    "modifier": 5,
    "priceJump": 2.0,
    "owned": 0
  },
  "g1": {
    "name": "convert resource 1 to good 1",
    "type": "good",
    "price": {
      "r1": 5
    },
    "resource": "r1",
    "resourceCost": 5,
    "winRate": 0.5,
    "good": "g1",
    "modifier": 1,
    "priceJump": 1.1,
    "owned": 0,
    "total": 0,
    "maxStorage": 500
  },
  "g2": {
    "name": "convert resource 2 to good 2",
    "type": "good",
    "price": {
      "r2": 5
    },
    "resource": "r2",
    "resourceCost": 5,
    "winRate": 0.5,
    "good": "g2",
    "modifier": 1,
    "priceJump": 1.1,
    "owned": 0,
    "total": 0,
    "maxStorage": 500
  },
  "g3": {
    "name": "convert resource 2 to good 2",
    "type": "good",
    "price": {
      "r3": 50
    },
    "resource": "r3",
    "resourceCost": 1,
    "winRate": 0.5,
    "good": "g3",
    "modifier": 1,
    "priceJump": 1.1,
    "owned": 0,
    "total": 0,
    "maxStorage": 500
  },
  "b1": {
    "name": "barrack 1",
    "type": "barrack",
    "barrack": "b1",
    "price": {
      "g1": 20,
      "g2": 20
    },
    "priceProgress": {
      "g1": 0,
      "g2": 0
    },
    "unit": "d1",
    "maintenance": {
      "r1": 5
    },
    "owned": 0,
    "buying": false
  },
  "d1": {
    "type": "defender",
    "resource": "d1",
    "owned": 0
  },
  "b2": {
    "name": "barrack 2",
    "type": "barrack",
    "barrack": "b2",
    "price": {
      "g1": 100,
      "g2": 100
    },
    "priceProgress": {
      "g1": 0,
      "g2": 0
    },
    "unit": "d2",
    "maintenance": {
      "r1": 5
    },
    "owned": 0,
    "buying": false
  },
  "d2": {
    "type": "defender",
    "resource": "d2",
    "owned": 0
  },
  "b3": {
    "name": "barrack 3",
    "type": "barrack",
    "barrack": "b3",
    "price": {
      "g3": 250
    },
    "priceProgress": {
      "g1": 0,
      "g2": 0
    },
    "unit": "d3",
    "maintenance": {
      "r3": 5
    },
    "owned": 0,
    "buying": false
  },
  "d3": {
    "type": "defender",
    "resource": "d3",
    "owned": 0
  }
};