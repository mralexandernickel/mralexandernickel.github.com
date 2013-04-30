# 
#  application.coffee
#  mralexandernickel.github.com
#  
#  @author Alexander Nickel <mr.alexander.nickel@gmail.com>
#  @company labor:80 <http://labor80.de>
#  @copyright Alexander Nickel 2013-01-05T19:07:06Z
# 
window.addEventListener "load", ->
  # Set a timeout...
  setTimeout (->
    # Hide the address bar!
    window.scrollTo 0, 1
  ), 0
  
$ ->
  console.log "domready"