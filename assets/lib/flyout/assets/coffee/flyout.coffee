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
        state = false
        if n?# workaround, cause the json contains null at last position
          for key in search_keys
            for search_word in search_arr
              if $.isArray key
                for tag in key
                  if $.inArray tag, n["tags"] >= 0
                    state = true
              else
                if n[key].indexOf search_word >= 0
                  state = true
        return state
      console.log result
  
  # swipe functionality
  unless is_android_default
    $("#script_touchswipe").load (e) ->
      $("html, body").swipe
        swipeLeft: (event, direction, distance, duration, fingercount) -> $("#flyout").removeClass "open"
        swipeRight: (event, direction, distance, duration, fingercount) -> $("#flyout").addClass "open"
      