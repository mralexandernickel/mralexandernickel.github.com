# 
#  application.coffee
#  mralexandernickel.github.com
#  
#  @author Alexander Nickel <mr.alexander.nickel@gmail.com>
#  @company labor:80 <http://labor80.de>
#  @copyright Alexander Nickel 2013-01-05T19:07:06Z
# 
$ ->
  ua = navigator.userAgent.toLowerCase()
  is_android = ua.indexOf("android") > -1
  is_webkit = ua.indexOf("safari") > -1
  is_chrome = ua.indexOf("chrome") > -1
  is_android_default = is_android and is_webkit and is_chrome is false
  
  Modernizr.load
    test: Modernizr.touch and is_android_default is false
    yep: "/lib/jquery/jquery.touchswipe.min.js"
    nope: false
      
  $("#main").append $("<pre>is_android_default: #{is_android_default}</pre>")
  
  if $("#results").length > 0
    $.get "/search.json", (response) ->
      map =
        "category": getParam("category")
        "tags": getParam("tags")
        "search": getParam("search")
    
      for type,value of map
        posts = filterPostsByPropertyValue response, type, value
        if posts.length is 0
          noResultsPage type, value
        else
          layoutResultsPage type, value, posts