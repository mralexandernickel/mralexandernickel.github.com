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
    search_str = $(this).val().toLowerCase()
    search_arr = search_str.split " "
    search_keys = ["title","category","tags"]
    
    if search_str.length > 1
      console.log $.grep window.posts, (n,i) ->
        if n isnt null# workaround, cause the json contains null at last position
          ($.inArray(search_str, n.tags) >= 0)
  
  # swipe functionality
  unless is_android_default
    $("#script_touchswipe").load (e) ->
      $("html, body").swipe
        swipeLeft: (event, direction, distance, duration, fingercount) -> $("#flyout").removeClass "open"
        swipeRight: (event, direction, distance, duration, fingercount) -> $("#flyout").addClass "open"
      