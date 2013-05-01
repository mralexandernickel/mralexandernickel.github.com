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
      var result, search_arr, search_keys, search_str,
        _this = this;

      search_str = $(this).val();
      search_arr = search_str.split(" ");
      search_keys = ["title", "category", "tags"];
      if (search_str.length > 1) {
        result = $.grep(window.posts, function(n, i) {
          var key, search_word, state, tag, _i, _j, _k, _len, _len1, _len2;

          state = false;
          if (n != null) {
            for (_i = 0, _len = search_keys.length; _i < _len; _i++) {
              key = search_keys[_i];
              for (_j = 0, _len1 = search_arr.length; _j < _len1; _j++) {
                search_word = search_arr[_j];
                if ($.isArray(key)) {
                  for (_k = 0, _len2 = key.length; _k < _len2; _k++) {
                    tag = key[_k];
                    if ($.inArray(tag, n["tags"] >= 0)) {
                      state = true;
                    }
                  }
                } else {
                  if (n[key].indexOf(search_word >= 0)) {
                    state = true;
                  }
                }
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
