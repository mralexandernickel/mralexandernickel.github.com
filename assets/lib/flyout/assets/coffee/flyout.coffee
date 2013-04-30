$ ->
  # toggle button
  $("#flyout .toggle").click (e) ->
    e.preventDefault()
    $("#flyout").toggleClass "open"
  
  ua = navigator.userAgent.toLowerCase()
  is_android = ua.indexOf("android") > -1
  is_webkit = ua.indexOf("safari") > -1
  is_chrome = ua.indexOf("chrome") > -1
  is_android_default = is_android and is_webkit and is_chrome is false
  
  # swipe functionality
  if Modernizr.touch
    unless is_android_default
      $("html, body").swipe
        swipeLeft: (event, direction, distance, duration, fingercount) -> $("#flyout").removeClass "open"
        swipeRight: (event, direction, distance, duration, fingercount) -> $("#flyout").addClass "open"
      