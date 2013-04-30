(function() {
  window.addEventListener("load", function() {
    return setTimeout((function() {
      return window.scrollTo(0, 1);
    }), 0);
  });

  $(function() {
    return console.log("domready");
  });

}).call(this);
