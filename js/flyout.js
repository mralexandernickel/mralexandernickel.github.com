(function() {
  $(function() {
    return $("#flyout .toggle").click(function(e) {
      e.preventDefault();
      return $("#flyout").toggleClass("open");
    });
  });

}).call(this);
