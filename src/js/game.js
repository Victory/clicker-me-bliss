var gameState = 'pause';

var Game = function(items) {
  this.totalClicks = 0;
  this.items = items;

  this.click = function(id) {
    return function (evt) {
      if (this.items.clicksOwned.total < 1) {
        this.log("You can't click for resources any more");
        return;
      }
      this.totalClicks++;
      this.items[id].total++;
      this.items.clicksOwned.total -= 1;
      num('clicksOwned', this.items.clicksOwned.total);
      num('t' + id, this.items[id].total);
    }.bind(this);
  };

  this.forin = function (obj, callback) {
    forin(obj, callback.bind(this));
  };

  this.log = function (msg, type) {
    if (!type) {
      type = 'notice';
    }
    console.log(msg, type);
  };

  this.updateAllItems = function(g) {
    var ii;
    for (ii = 0; ii < g.items.increaseClicksPerGeneration.total; ii++) {
      if (g.items.clicksOwned.total < g.items.maxClicks.total) {
        g.items.clicksOwned.total += 1;
      }
    }


    for (ii in g.items) {
      if (g.items.hasOwnProperty(ii) &&
          (g.items[ii].owned > 0 ||
           g.items[ii].buying)) {
        var item = g.items[ii];
        if (item.type === 'item') {
          g.updateItem(g, item);
        } else if(item.type === 'good') {
          g.updateGood(g, item);
        } else if(item.type === 'barrack') {
          g.updateBarrack(g, item);
        }
      }
    }
    g.updateCounters();
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

  this.updateGood = function(g, item) {
    var jj = 1;
    while (g.items[item.resource].total >= item.resourceCost &&
           jj <= item.owned) {
      jj += 1;
      g.items[item.resource].total -= item.resourceCost;
      g.items[item.good].total += 1;
    }
  };

  this.updateBarrack = function (g, item) {
    if (item.owned === 0 && !item.buying) {
      return;
    }

    if (item.buying) {
      this.forin(
        item.price,
        function (price, good, prices) {
          if (g.items[item.barrack].price[good] < 1) {
            return;
          }
          var mp = Math.min(price, g.items[good].total);
          g.items[good].total -= mp;
          g.items[item.barrack].priceProgress[good] += mp;
          g.items[item.barrack].price[good] -= mp;
        }
      );

      // see if item is fully purchased
      var purchased = true;
      this.forin(
        item.price,
        function (price, good, prices) {
          if (g.items[item.barrack].price[good] !== 0) {
            purchased = false;
            return;
          }
        }
      );

      if (purchased) {
        g.items[item.barrack].owned = 1;
        g.items[item.barrack].buying = false;
      } else {
        return;
      } // didn't fully purchase
    }// item buying

    if (item.owned) {
      this.forin(
        item.maintenance,
        function (price, resource, prices) {
          g.items[resource].total -= price;
          g.items[item.unit].owned += 1;
        }
      );
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
        } else if (item.type === 'defender') {
          num(item.resource, item.owned);
        } else if (item.type === 'barrack') {
          forin(item.price, function (price, resource) {
            num('p' + name + resource, price);
          });
        } else if (item.type === 'maxClicks') {
          num(name, item.total);
        } else if (item.type === 'clicksOwned') {
          num(name, item.total);
        } else if (item.type === 'increaseMaxClicks') {
          num("p" + name, item.price);
        } else if (item.type === 'increaseClicksPerGeneration') {
          num("p" + name, item.price);
          num('clicksPerGeneration', item.total);
        } else if (item.type === 'generation') {
          num('generation', this.items.generation.total);
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

  this.buyBarrack = function(id) {
    return function(evt) {
      this.items[id].owned = false;
      this.items[id].buying = true;
      gId(id).disabled = true;
    }.bind(this);
  };

  this.buyClicks = function (name)  {
    return function () {
      var item = this.items[name];

      if (this.items.clicksOwned.total < 1) {
        return;
      }
      this.items.clicksOwned.total -= 1;
      num('clicksOwned', this.items.clicksOwned.total);

      this.items[name].price -= 1;

      if (item.price === 0) {
        this.items[name].initPrice *=
          item.priceJump;
        this.items[name].initPrice = Math.floor(this.items[name].initPrice);

        this.items[name].price =
          item.initPrice;
        if (item.type === "increaseMaxClicks") {
          this.items.maxClicks.total += 1;
        } else if (item.type === 'increaseClicksPerGeneration') {
          this.items.increaseClicksPerGeneration.total += 1;
        }
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
    bind(gId(id), 'click', this.click(id));
  };

  this.bindSell = function(id) {
    var btn = gId("s" + id);
    if (btn) {
      bind(btn, 'click', this.sell(id));
    }
  };

  this.bindBuyStorage = function (id) {
    var btn = gId("s" + id);
    if (btn) {
      bind(btn, 'click', this.buyStorage(id));
    }
  };

  this.bindBuyBarrack = function(id) {
    var btn = gId(id);
    if (btn) {
      bind(btn, 'click', this.buyBarrack(id));
    }
  };

  this.bindBuyClicks = function (name) {
    var btn = gId(name);
    bind(btn, 'click', this.buyClicks(name));
  };

  this.updateVisualFeedback = function (g) {
    var owned = g.items.clicksOwned.total;
    var max = g.items.maxClicks.total;
    var vf = gId("visualFeedback");

    var color = "#F00";
    var baseColor = "#FFF";

    var fb;
    var ii;

    for (ii=0; ii < max; ii++) {
      fb = document.getElementById("feedback" + ii);
      if (!fb) {
        var elm = ce('span');
        elm.id = "feedback" + ii;
        elm.appendChild(document.createTextNode("+"));
        gId("visualFeedback").appendChild(elm);
        fb = document.getElementById("feedback" + ii);
      }
      fb.style.color = baseColor;
    }

    for (ii=0; ii < owned; ii++) {
      fb = document.getElementById("feedback" + ii);
      if (!fb) {
        return;
      }
      fb.style.color = color;
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
        } else if (item.type === 'barrack') {
          g.bindBuyBarrack(item.barrack);
        } else if (item.type === 'increaseMaxClicks' ||
                   item.type === 'increaseClicksPerGeneration') {
          g.bindBuyClicks(item.type);
        }
      }
    );

    //g.bindUpdateVisualFeedback(g);

    (function () {
      var btn = gId("pausePlay");
      btn.addEventListener(
        'click',
        function() {
          gameState = 'play';
          btn.outerHTML = '';

          var cheatCodesTextarea = gId("cheatCodes");
          var cheatCodes = cheatCodesTextarea.value;

          var textNode = document.createTextNode(cheatCodes);
          gId('runningCheat').appendChild(textNode);
          // delete the text area
          cheatCodesTextarea.outerHTML = '';

          if (!cheatCodes) {
            gId("cheatCodeInfo").outerHTML = '';
            g.log('NOTICE: Cheat Code is empty');
            return;
          }

          var cheater = new Function(cheatCodes);

          var result = {};
          try {
            result = new cheater();
            g.log("Running Cheat Codes!", 'success');
          } catch (e) {
            g.log('ERROR: Cheat Code is not a valid callback function');
            console.log(e);
            return;
          }

          if (result.play) {
            g.log("Running as object (using this.play)");
            var oldPlay = result.play;
            result.play = function() {
              if (gameState !== 'play') {
                return;
              }
              try {
                oldPlay();
              } catch (e) {
                g.log('ERROR: In Player (check console output)',
                      'error');
                console.log(e);
              }
            };
            setInterval(result.play, 50);
          } else {
            g.log("Running as function");
            var oldCheater = cheater;
            cheater = function () {
              if (gameState !== 'play') {
                return;
              }

              try {
                oldCheater();
              } catch (e) {
                g.log('ERROR: Cheater Function (check console output)',
                      'error');
                console.log(e);
              }
            };
            setInterval(cheater, 50);
          }
        }
      );
    }());

    g.updateCounters();

    setInterval(
      function () {
        g.updateVisualFeedback(g);
      }, 100);

    setInterval(
      function () {
        if (gameState !== 'play') {
          return;
        }
        g.items.generation.total += 1;
        g.updateAllItems(g);
      }, 1000);

  }(this));

};

(function() {
  var n = new Game(Gitems);
}());
