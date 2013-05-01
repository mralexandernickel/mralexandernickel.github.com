(function() {
  $(function() {
    $("#flyout_toggle").click(function(e) {
      e.preventDefault();
      return $("#flyout").toggleClass("open");
    });
    $("#flyout_search_toggle").click(function(e) {
      e.preventDefault();
      $("#flyout_toggle").toggleClass("hide");
      $("#flyout_search").toggleClass("open");
      $("#backdrop").toggleClass("open");
      return $("#flyout_search input").focus();
    });
    if (!is_android_default) {
      return $("html, body").swipe({
        swipeLeft: function(event, direction, distance, duration, fingercount) {
          return $("#flyout").removeClass("open");
        },
        swipeRight: function(event, direction, distance, duration, fingercount) {
          return $("#flyout").addClass("open");
        }
      });
    }
  });

}).call(this);
