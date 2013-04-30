(function() {
  $(function() {
    var isAndroid, isAndroidChrome, isAndroidWebkit, ua;

    ua = navigator.userAgent.toLowerCase();
    isAndroid = ua.indexOf("android") > -1;
    isAndroidWebkit = ua.indexOf("safari") > -1;
    isAndroidChrome = ua.indexOf("chrome") > -1;
    $("#main").append($("<pre>isAndroid: " + isAndroid + "</pre><pre>isAndroidChrome: " + isAndroidChrome + "</pre><pre>isAndroidWebkit: " + isAndroidWebkit + "</pre><pre>" + ua + "</pre>"));
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
