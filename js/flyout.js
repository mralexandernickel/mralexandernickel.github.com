(function() {
  $(function() {
    $("#flyout .toggle").click(function(e) {
      e.preventDefault();
      return $("#flyout").toggleClass("open");
    });
    return $("html, body").swipe({
      swipeLeft: function(event, direction, distance, duration, fingercount) {
        return $("#flyout").removeClass("open");
      },
      swipeRight: function(event, direction, distance, duration, fingercount) {
        return $("#flyout").addClass("open");
      }
    });
  });

}).call(this);
