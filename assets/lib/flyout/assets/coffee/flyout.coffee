$ ->
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
    posts = false
    $.get "/posts.json", (response) -> posts = response
    if $(this).val().length > 1
      if posts
        map =
          "search": $(this).val()
    
        for type,value of map
          posts = filterPostsByPropertyValue response, type, value
          console.log posts
          #if posts.length is 0
          #  noResultsPage type, value
          #else
          #  layoutResultsPage type, value, posts
  
  # swipe functionality
  unless is_android_default
    $("#script_touchswipe").load (e) ->
      $("html, body").swipe
        swipeLeft: (event, direction, distance, duration, fingercount) -> $("#flyout").removeClass "open"
        swipeRight: (event, direction, distance, duration, fingercount) -> $("#flyout").addClass "open"
      