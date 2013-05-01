(function() {
  $(function() {
    $.getJSON("/posts.json", function(response) {
      return window.posts = response;
    });
    $("#flyout_toggle").click(function(e) {
      e.preventDefault();
      return $("#flyout").toggleClass("open");
    });
    $("#flyout_search_toggle").click(function(e) {
      e.preventDefault();
      $("#flyout_search input").toggleClass("hidden");
      $("#flyout_toggle").toggleClass("hide");
      if ($(this).parent().hasClass("open")) {
        $("#flyout_search input").blur();
      } else {
        $("#flyout_search input").focus();
      }
      $(this).parent().toggleClass("open");
      return $("#backdrop").toggleClass("open");
    });
    $("#search_field").keyup(function(e) {
      var map, newone;

      if ($(this).val().length > 1) {
        console.log(window.posts);
        newone = $.grep(window.posts, function(n, i) {
          return n.category === "testing";
        });
        console.log(newone);
        return map = {
          "category": $(this).val(),
          "tags": $(this).val(),
          "search": $(this).val()
        };
      }
    });
    if (!is_android_default) {
      return $("#script_touchswipe").load(function(e) {
        return $("html, body").swipe({
          swipeLeft: function(event, direction, distance, duration, fingercount) {
            return $("#flyout").removeClass("open");
          },
          swipeRight: function(event, direction, distance, duration, fingercount) {
            return $("#flyout").addClass("open");
          }
        });
      });
    }
  });

}).call(this);
