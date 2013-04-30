(function() {
  $(function() {
    var isAndroid, ua;

    ua = navigator.userAgent.toLowerCase();
    isAndroid = ua.indexOf("android") > -1;
    return $("#main").append($("<pre>" + isAndroid + "</pre>"));
  });

}).call(this);
