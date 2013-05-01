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
