var Game = function(items) {
  this.r1 = 50;
  this.g1 = 0;
  this.totalClicks = 0;
  this.items = items;

  this.click = function(id) {
    return function (evt) {
      this.totalClicks++;
      this[id]++;
      num('t' + id, this[id]);
    }.bind(this);
  };

  this.forin = function (obj, callback) {
    forin(obj, callback.bind(this));
  };

  this.log = function (msg) {
    console.log(msg);
  };

  this.updateCounters = function() {
    num('tr1', this.r1);

    this.forin (
      this.items,
      function (item, name, items) {
        if (item.type === 'item') {
          num('o' + name, item.owned);
          forin(item.price, function (price, resource) {
            num('p' + name + resource, price);
          });
        }
        if (item.type === 'good') {
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
          if (this[ii] < price) {
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
          this[ii] = this[ii] - price;
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
    //g.bindSpend('i1');
    g.bindBuyGoodCreator('g1');
    g.bindBuyResourceCreator('i1');

    g.updateCounters();

    setInterval(
      function () {
        var ii;
        for (ii in g.items) {
          if (g.items.hasOwnProperty(ii)) {
            var item = g.items[ii];
            if (item.type === 'item') {
              g[item.resource] += item.owned * item.modifier;
              num("t" + item.resource, g[item.resource]);
            } else if(item.type === 'good' &&
                      item.owned > 0) {
              var jj = 0;
              while (g[item.resource] - item.resourceCost > 0 &&
                    jj <= item.owned) {
                console.log(g[item.good], item.owned);
                jj += 1;
                g[item.resource] -= item.resourceCost * item.owned;
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