$ ->
  # get the search data
  $.getJSON "/posts.json", (response) -> window.posts = response
  
  # toggle button
  $("#flyout_toggle").click (e) ->
    e.preventDefault()
    $("#flyout").toggleClass "open"
  
  $("#flyout_search_toggle").click (e) ->
    e.preventDefault()
    $("#flyout_search input").toggleClass "hidden"
    $("#flyout_toggle").toggleClass "hide"
    if $(this).parent().hasClass "open"
      $("#flyout_search input").blur()
    else
      $("#flyout_search input").focus()
    $(this).parent().toggleClass "open"
    $("#backdrop").toggleClass "open"
  
  $("#search_field").keyup (e) ->
    search_str = $(this).val()
    search_arr = search_str.split " "
    search_keys = ["title","category","tags"]
    
    if search_str.length > 1
      result = $.grep window.posts, (n,i) =>
        if n isnt null# workaround, cause the json contains null at last position
          $.inArray "future", n.tags >= 0
      console.log result
  
  # swipe functionality
  unless is_android_default
    $("#script_touchswipe").load (e) ->
      $("html, body").swipe
        swipeLeft: (event, direction, distance, duration, fingercount) -> $("#flyout").removeClass "open"
        swipeRight: (event, direction, distance, duration, fingercount) -> $("#flyout").addClass "open"
      