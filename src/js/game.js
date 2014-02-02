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

  this.updateCounters = function() {
    this.forin (
      this.items,
      function (item, name, items) {
        if (item.type === 'resource') {
          num('t' + item.resource, item.total);
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

  var constructor = (function (g) {
    g.bindClick('r1');
    g.bindBuyGoodCreator('g1');
    g.bindBuyResourceCreator('i1');

    g.updateCounters();

    setInterval(
      function () {
        var ii;
        for (ii in g.items) {
          if (g.items.hasOwnProperty(ii)) {
            var item = g.items[ii];
            if (item.owned === 0) {
              continue;
            }
            if (item.type === 'item') {
              g.items[item.resource].total += item.owned * item.modifier;
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