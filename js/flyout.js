(function() {
  $(function() {
    $("#flyout_toggle").click(function(e) {
      e.preventDefault();
      return $("#flyout").toggleClass("open");
    });
    $("#flyout_search_toggle").click(function(e) {
      e.preventDefault();
      $(this).parent().toggleClass("closed");
      $("#flyout_toggle").toggleClass("hide");
      if ($(this).parent().hasClass("open")) {
        $("#flyout_search input").blur();
      } else {
        $("#flyout_search input").focus();
      }
      $(this).parent().toggleClass("open");
      return $("#backdrop").toggleClass("open");
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
