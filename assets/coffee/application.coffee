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
  isAndroid = ua.indexOf("android") > -1
  $("#main").append $("<pre>#{isAndroid}</pre>")
  
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