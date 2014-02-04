var Game = function(items) {
  this.totalClicks = 0;
  this.items = items;

  this.click = function(id) {
    return function (evt) {
      this.totalClicks++;
      this.items[id].total++;
      num('t' + id, this.items[id].total);
    }.bind(this);
  };

  this.forin = function (obj, callback) {
    forin(obj, callback.bind(this));
  };

  this.log = function (msg) {
    console.log(msg);
  };

  this.updateItem = function(g, item) {
    var ii = 0;
    for (kk = 0; kk < item.owned; kk++) {
      var total = g.items[item.resource].total;
      var maxStorage = g.items[item.resource].maxStorage;
      if (total + 1 > maxStorage) {
        g.items[item.resource].total -=
          0.25 * (total - maxStorage);
      } else {
        g.items[item.resource].total += 1;
      }
    }
  };

  this.updateCounters = function() {
    this.forin (
      this.items,
      function (item, name, items) {
        if (item.type === 'resource') {
          num('t' + item.resource, item.total);
          num('ps' + item.resource, item.maxStoragePrice);
          num('ms' + item.resource, item.maxStorage);
        } else if (item.type === 'item') {
          num('o' + name, item.owned);
          forin(item.price, function (price, resource) {
            num('p' + name + resource, price);
          });
        }else if (item.type === 'good') {
          forin(item.price, function (price, resource) {
            num('p' + name + resource, price);
          });
          num('o' + name, item.owned);
          num('t' + name, item.total);
        }
      }
    );
  }.bind(this);


  this.buyGoodCreator = function (id) {
    return function (evt) {
      var itemInfo = this.items[id];
      var noMonies = false;
      this.forin(
        itemInfo.price,
        function (price, ii) {
          if (this.items[ii].total < price) {
            noMonies = true;
          }
        }
      );
      if (noMonies) {
        this.log("No Monies!");
        return;
      }
      this.forin(
        itemInfo.price,
        function (price, ii, item) {
          this.items[ii].total = this.items[ii].total - price;
          this.items[id].price[ii] *= this.items[id].priceJump;
        }
      );

      this.items[id].owned++;
      this.updateCounters();
      this.totalClicks++;
    }.bind(this);
  };

  this.sell = function (id) {
    return function (evt) {
      var item = this.items[id];
      if (item.owned > 0) {
        this.items[id].owned -= 1;
        this.forin(
          this.items[id].price,
          function (price, ii, item) {
            this.items[id].price[ii] /= this.items[id].priceJump;
          }
        );
      } else {
        this.log("you don't own any");
      }
      this.updateCounters();
    }.bind(this);
  };

  this.buyStorage = function(id) {
    return function (evt) {
      var item = this.items[id];
      if (this.items[id].total < item.maxStoragePrice) {
        this.log("You can't afford that");
        return;
      }
      this.items[id].total -= item.maxStoragePrice;
      this.items[id].maxStorage *= item.maxStorageJump;
      this.items[id].maxStoragePrice *= item.maxStoragePriceJump;

      this.updateCounters();
    }.bind(this);
  };

  this.bindBuyGoodCreator = function(id) {
    bind(gId(id),'click', this.buyGoodCreator(id));
    this.bindSell(id);
  };

  this.bindBuyResourceCreator = function(id) {
    bind(gId(id),'click', this.buyGoodCreator(id));
    this.bindSell(id);
  };

  this.bindClick= function(id) {
    bind(gId(id),'click', this.click(id));
  };

  this.bindSell = function(id) {
    var btn = gId("s" + id);
    if (btn) {
      bind(btn,'click', this.sell(id));
    }
  };

  this.bindBuyStorage = function (id) {
    var btn = gId("s" + id);
    if (btn) {
      bind(btn,'click', this.buyStorage(id));
    }
  };

  var constructor = (function (g) {

    forin(
      g.items,
      function (item, resource) {
        if (item.type === 'resource') {
          g.bindClick(resource);
          g.bindBuyStorage(resource);
        } else if (item.type === 'item') {
          g.bindBuyResourceCreator(resource);
        } else if (item.type === 'good') {
          g.bindBuyGoodCreator(item.good);
        }
        //
      }
    );

    g.updateCounters();

    setInterval(
      function () {
        var ii;
        for (ii in g.items) {
          if (g.items.hasOwnProperty(ii) &&
             g.items[ii].owned > 0) {
            var item = g.items[ii];
            if (item.type === 'item') {
              g.updateItem(g, item);
            } else if(item.type === 'good') {
              var jj = 1;
              while (g.items[item.resource].total >= item.resourceCost &&
                    jj <= item.owned) {
                jj += 1;
                g.items[item.resource].total -= item.resourceCost;
                g.items[item.good].total += item.owned;
              }
            }
          }
        }
        g.updateCounters();
      }, 1000);
  }(this));

};

g = new Game(Gitems);