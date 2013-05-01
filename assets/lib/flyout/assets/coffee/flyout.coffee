$ ->
  # toggle button
  $("#flyout_toggle").click (e) ->
    e.preventDefault()
    $("#flyout").toggleClass "open"
  
  $("#flyout_search_toggle").click (e) ->
    e.preventDefault()
    $("#flyout_toggle").toggleClass "hide"
    if $(this).parent().hasClass "open"
      $("#flyout_search input").blur()
    else
      $("#flyout_search input").focus()
    $(this).parent().toggleClass "open"
    $("#backdrop").toggleClass "open"
  
  # swipe functionality
  unless is_android_default
    $("html, body").swipe
      swipeLeft: (event, direction, distance, duration, fingercount) -> $("#flyout").removeClass "open"
      swipeRight: (event, direction, distance, duration, fingercount) -> $("#flyout").addClass "open"
      