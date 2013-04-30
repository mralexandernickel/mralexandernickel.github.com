$ ->
  # toggle button
  $("#flyout .toggle").click (e) ->
    e.preventDefault()
    $("#flyout").toggleClass "open"
  
  # swipe functionality
  #$("html, body").swipe
  #  swipeLeft: (event, direction, distance, duration, fingercount) -> $("#flyout").removeClass "open"
  #  swipeRight: (event, direction, distance, duration, fingercount) -> $("#flyout").addClass "open"
      