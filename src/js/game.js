var Game = function() {
  this.r1 = 0;
  this.totalClicks = 0;
  this.items = {
    i1: {
      name: '5 more clicks',
      price: {
        r1: 20
      },
      resource: 'r1',
      modifier: 5,
      owned: 0
    }
  };

  this.click = function(id) {
    return function (evt) {
      this.totalClicks++;
      this[id]++;
      num('t' + id, this[id]);
    }.bind(this);
  };

  this.spend = function (id) {

    return function (evt) {
      var itemInfo = this.items[id];
      var noMonies = false;
      var ii;

      for (ii = 0; i < itemInfo.price.length; ii++) {
        if (this[ii] < itemInfo[ii].price[ii]) {
          noMonies = true;
        }
      }
      if (noMonies) {
        console.log("No Monies!");
        return;
      }

      for (ii = 0; i < itemInfo.price.length; ii++) {
        this[ii] = this[ii] - itemInfo.price[ii];
        num('t' + ii, this[ii]);
      }
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

    num('tr1', g.r1);
    num('ti1', g.items.i1.owned);
  }(this));
};

g = new Game();