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
    search_results = $("#search_results").html ""
    search_str = $(this).val().toLowerCase()
    search_arr = search_str.split " "
    search_keys = ["title","category","tags"]
    
    # filter posts.json
    if search_str.length > 1
      result = $.grep window.posts, (n,i) ->
        state = false
        for key in search_keys
          if $.isArray n[key]
            for search_word in search_arr
              unless state# just set to false if NOT already true!
                state = ($.inArray(search_word, n[key]) >= 0)# we need to make sure that tags are ALWAYS lowercase
          else
            unless state
              state = (n[key].toLowerCase().indexOf(search_str) >= 0)
        return state
        
      # show result to user
      for item in result
        search_results.append $("<article class=\"teaser\"><a href=\"#{item.href}\"><header><h3>#{item.title}</h3><h4><em>#{item.author} <small>#{item.date_string}</small></em></h4></header></a></article>")
  
  # swipe functionality
  #unless is_android_default
  #  $("#script_touchswipe").load (e) ->
  #    $("html, body").swipe
  #      swipeLeft: (event, direction, distance, duration, fingercount) -> $("#flyout").removeClass "open"
  #      swipeRight: (event, direction, distance, duration, fingercount) -> $("#flyout").addClass "open"
      