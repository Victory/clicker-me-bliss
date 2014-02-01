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

  this.spend = function (id) {

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
        console.log("No Monies!");
        return;
      }
      this.forin(
        itemInfo.price,
        function (price, ii, item) {
          this[ii] = this[ii] - price;
          this.items[id].price[ii] *= this.items[id].priceJump;
          num('t' + ii, this[ii]);
          num("c" + id, this.items[id].price[ii]);
        }
      );

      this.items[id].owned++;
      num('t' + id,  this.items[id].owned);
      this.totalClicks++;
    }.bind(this);
  };

  this.bindSpend = function(id) {
    bind(gId(id),'click', this.spend(id));
  };

  this.bindClick= function(id) {
    bind(gId(id),'click', this.click(id));
  };

  var constructor = (function (g) {
    g.bindClick('r1');
    g.bindSpend('i1');
    g.bindSpend('g1');

    num('tr1', g.r1);
    num('ti1', g.items.i1.owned);

    setInterval(
      function () {
        var ii;
        for (ii in g.items) {
          if (g.items.hasOwnProperty(ii)) {
            var item = g.items[ii];
            if (item.type === 'resource') {
              g[item.resource] += item.owned * item.modifier;
              num("t" + item.resource, g[item.resource]);
            } else if(item.type === 'good' &&
                      item.owned > 0) {
              var jj = 0;
              while (g[item.resource] >= item.resourceCost &&
                    jj <= item.owned) {
                jj += 1;
                g[item.resource] -= item.resourceCost * item.owned;
                g[item.good] += item.owned;
                num("t" + item.good, g[item.good]);
                num("t" + item.resource, g[item.resource]);
              }
            }
          }
        }
      }, 1000);
  }(this));
};

g = new Game(Gitems);