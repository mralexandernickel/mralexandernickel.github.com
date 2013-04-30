(function() {
  $(function() {
    var is_android, is_android_default, is_chrome, is_webkit, ua;

    ua = navigator.userAgent.toLowerCase();
    is_android = ua.indexOf("android") > -1;
    is_webkit = ua.indexOf("safari") > -1;
    is_chrome = ua.indexOf("chrome") > -1;
    is_android_default = is_android && is_webkit && is_chrome === false;
    Modernizr.load({
      test: Modernizr.touch && is_android_default === false,
      yep: "/lib/jquery/jquery.touchswipe.min.js",
      nope: false
    });
    $("#main").append($("<pre>is_android_default: " + is_android_default + "</pre>"));
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
