(function() {
  $(function() {
    var is_android, is_android_default, is_chrome, is_webkit, ua;

    $("#flyout .toggle").click(function(e) {
      e.preventDefault();
      return $("#flyout").toggleClass("open");
    });
    ua = navigator.userAgent.toLowerCase();
    is_android = ua.indexOf("android") > -1;
    is_webkit = ua.indexOf("safari") > -1;
    is_chrome = ua.indexOf("chrome") > -1;
    is_android_default = is_android && is_webkit && is_chrome === false;
    if (Modernizr.touch) {
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
    }
  });

}).call(this);
