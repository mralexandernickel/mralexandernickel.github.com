# 
#  application.coffee
#  mralexandernickel.github.com
#  
#  @author Alexander Nickel <mr.alexander.nickel@gmail.com>
#  @company labor:80 <http://labor80.de>
#  @copyright Alexander Nickel 2013-01-05T19:07:06Z
# 
$ ->
  # totop
  totop = $(".totop")
  totop.click (e) ->
    _gaq.push ["_trackEvent","To Top","Click"]
    e.preventDefault()
    $("body,html").animate scrollTop: 0
  
  # search init
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