var Game = function() {
  this.r1 = 0;
  this.totalClicks = 0;

  this.click = function(id) {
    return function (evt) {
      this.totalClicks++;
      this[id]++;
      num('t' + id, this[id]);
    }.bind(this);
  };

  this.bindClick= function(id) {
    bind(gId(id),'click', this.click(id));
  };

  var constructor = (function (g) {
    g.bindClick('r1');
  }(this));
};

g = new Game();