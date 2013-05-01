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
      var result, search_arr, search_keys, search_str;

      search_str = $(this).val().toLowerCase();
      search_arr = search_str.split(" ");
      search_keys = ["title", "category", "tags"];
      if (search_str.length > 1) {
        result = $.grep(window.posts, function(n, i) {
          var key, search_word, state, _i, _j, _len, _len1;

          state = false;
          if (n != null) {
            for (_i = 0, _len = search_keys.length; _i < _len; _i++) {
              key = search_keys[_i];
              if ($.isArray(n[key])) {
                for (_j = 0, _len1 = search_arr.length; _j < _len1; _j++) {
                  search_word = search_arr[_j];
                  state = $.inArray(search_word, n[key]) >= 0;
                }
              } else {
                state = n[key].indexOf(search_str) >= 0;
              }
            }
          }
          return state;
        });
        return console.log(result);
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
