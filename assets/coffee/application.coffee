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