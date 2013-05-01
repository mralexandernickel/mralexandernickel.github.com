$ ->
  # get the search data
  $.getJSON "/posts.json", (response) ->
    window.posts = response
  
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
    if $(this).val().length > 1
      console.log window.posts
      newone = $.grep window.posts, (n,i) -> n.category is "testing"
      console.log newone
      
      map =
        "category": $(this).val()
        "tags": $(this).val()
        "search": $(this).val()
  
      #for type,value of map
        #result = filterPostsByPropertyValue posts, type, value
        #console.log result
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
      