$ ->
  # toggle button
  $("#flyout .toggle").click (e) ->
    e.preventDefault()
    $("#flyout").toggleClass "open"
  
  $("#flyout_search_toggle").click (e) ->
    e.preventDefault()
    $("#flyout_search").toggleClass "open"
  
  # swipe functionality
  unless is_android_default
    $("html, body").swipe
      swipeLeft: (event, direction, distance, duration, fingercount) -> $("#flyout").removeClass "open"
      swipeRight: (event, direction, distance, duration, fingercount) -> $("#flyout").addClass "open"
      