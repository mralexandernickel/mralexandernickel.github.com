(function() {
  $(function() {
    var totop;

    totop = $(".totop");
    totop.click(function(e) {
      _gaq.push(["_trackEvent", "To Top", "Click"]);
      e.preventDefault();
      return $("body,html").animate({
        scrollTop: 0
      });
    });
    if ($("#results").length > 0) {
      return $.get("/search.json", function(response) {
        var map, posts, type, value, _results;

        map = {
          "category": getParam("category"),
          "tags": getParam("tags"),
          "search": getParam("search")
        };
        _results = [];
        for (type in map) {
          value = map[type];
          posts = filterPostsByPropertyValue(response, type, value);
          if (posts.length === 0) {
            _results.push(noResultsPage(type, value));
          } else {
            _results.push(layoutResultsPage(type, value, posts));
          }
        }
        return _results;
      });
    }
  });

}).call(this);
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
    return $("#search_field").keyup(function(e) {
      var item, result, search_arr, search_keys, search_results, search_str, _i, _len, _results;

      search_results = $("#search_results").html("");
      search_str = $(this).val().toLowerCase();
      search_arr = search_str.split(" ");
      search_keys = ["title", "category", "tags"];
      if (search_str.length > 1) {
        result = $.grep(window.posts, function(n, i) {
          var key, search_word, state, _i, _j, _len, _len1;

          state = false;
          for (_i = 0, _len = search_keys.length; _i < _len; _i++) {
            key = search_keys[_i];
            if ($.isArray(n[key])) {
              for (_j = 0, _len1 = search_arr.length; _j < _len1; _j++) {
                search_word = search_arr[_j];
                if (!state) {
                  state = $.inArray(search_word, n[key]) >= 0;
                }
              }
            } else {
              if (!state) {
                state = n[key].toLowerCase().indexOf(search_str) >= 0;
              }
            }
          }
          return state;
        });
        _results = [];
        for (_i = 0, _len = result.length; _i < _len; _i++) {
          item = result[_i];
          _results.push(search_results.append($("<article class=\"teaser span4\"><a href=\"" + item.href + "\"><header><h3>" + item.title + "</h3><h4><em>" + item.author + " <small>" + item.date_string + "</small></em></h4></header></a></article>")));
        }
        return _results;
      }
    });
  });

}).call(this);
