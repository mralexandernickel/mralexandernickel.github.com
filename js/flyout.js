(function() {
  $(function() {
    var posts;

    posts = [];
    $.get("/posts.json", function(response) {
      return posts = response;
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
      var map, result, type, value, _results;

      if ($(this).val().length > 1) {
        map = {
          "category": $(this).val(),
          "tags": $(this).val(),
          "search": $(this).val()
        };
        _results = [];
        for (type in map) {
          value = map[type];
          result = filterPostsByPropertyValue(posts, type, value);
          _results.push(console.log(result));
        }
        return _results;
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
