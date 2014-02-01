var Game = function() {
  this.r1 = 0;

  var constructor = (function (g) {
    bind(
      gId('r1'),
      'click',
      function() {
        g.r1++;
        num('tr1', g.r1);
      });
  }(this));
};

g = new Game();