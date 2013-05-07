---
layout: post
author: Alexander Nickel
category: jekyll
tags:
  - jekyll
  - http
---
For some time now, I was looking for a Solution for myself to collect and maybe publish Information, Techniques or just Thoughts that come across while working on Projects. Any Blogging Software or Service should bring everything I need, but as a Developer I also want maximum Flexibility and maximum Speed. Both of these Requirements been bringing me, once again, to the point "just code everything you need by yourself!"...

The last Time setting up up a Wordpress System for a Customer, I was generating static copies of the Loops output and just regenerating them if a User signs out of the Wordpress Admin, as changes on most Pages of this Project are just appearing if somebody did something, exactly there. Saving static copies of dynamically generated Pages is nothing new, also triggering the Cache-Flush on "Admin Logout" is done in several Systems I know of, but for some reason, after this Project I was thinking about how all this Blog, Portfolio or small Company Website Content gets created and in (kind of) an opposite way delivered to the client.

    Typical PHP Request Visualization

The main point is the simple fact that dynamic webcontent just don't gets cached by the Webserver. And we are abandon that just because we want a Web based User Interface to manage our content... and are accepting that every request to our Website gets parsed through (for example) php, which itself is requesting the database just to query, generate and deliver the same content over and over again.

We could even go that far and say that this behaviour is directly influencing the environment, if we are setting this into context to the energy used by Webservers these days. Saying that, we could even go further and say that *our code is doing also*, as an efficient written block of code will use less CPU and therefore account less energy... this is of course totally blown up, but in the end not that wrong.

<blockquote>
<p><strong>Google accounts for roughly 0.013 percent of the world’s energy use</strong></p>

<p>Data centers in general are responsible for 1.3 percent of the world’s electricity consumption, according to one estimate, and Google says it accounts for a mere one-hundredth of that statistic. Do the math. The company claims that its data centers are twice as energy-efficient as most others.</p>

<p><strong>One Google search is equal to turning on a 60W light bulb for 17 seconds</strong></p>

<p>Google says it spends about 0.0003 kWh of energy on an average search query, translating to roughly 0.2g of carbon dioxide. Related fact: searching the web 100 times is equivalent to drinking 1.5 tablespoons of orange juice, Google says. That’s hard work!</p>
<small>found on <a href="http://techland.time.com/2011/09/09/6-things-youd-never-guess-about-googles-energy-use/">techland.time.com</a></small>
</blockquote>

I already took a quick look into Jekyll when I found out that it's supported on github pages, but haven't tried the posts feature of it. For those who haven't heard of it

<blockquote><p>
Jekyll is a simple, blog aware, static site generator. It takes a template directory (representing the raw form of a website), runs it through Textile or Markdown and Liquid converters, and spits out a complete, static website suitable for serving with Apache or your favorite web server.
</p>
<small>Description given on <a href="https://github.com/mojombo/jekyll">github page</a></small>
</blockquote>

So I was digging in my code archives for this first Jekyll Setup I made, which have been basically this here

#### \_config.yml

{% highlight yaml linenos %}
navigation:
- text: Start
  url: /
- text: About
  url: /about.html
{% endhighlight %}

#### \_layouts/default.html

{% highlight html linenos %}
{% raw %}
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    {% include navigation.html %}
    {{ content }}
  </body>
</html>
{% endraw %}
{% endhighlight %}

#### \_includes/navigation.html

{% highlight html linenos %}
{% raw %}
<ul class="nav">
  {% for link in site.navigation %}
    {% assign active = nil %}
    {% if page.url == link.url or page.layout == link.layout %}
      {% assign active = 'active' %}
    {% endif %}
    <li class="{{ active }}">
      <a href="{{ link.url }}">{{ link.text }}</a>
    </li>
  {% endfor %}
</ul>
{% endraw %}
{% endhighlight %}

#### index.html

{% highlight html linenos %}
---
layout: default
---
<h1>Start Page</h1>
{% endhighlight %}

#### about.html

{% highlight html linenos %}
---
layout: default
---
<h1>About Page</h1>
{% endhighlight %}

After taking a second look on Jekyll, how it handles Posts and implemented it in my Layout, I was really enjoying how things work. Jekyll is able to solve all, well, "misconception" described above... plus it has that little geeky touch :-) You could, and if you Host on Github you will, manage everything through Git, so every change gets tracked and is at any Point reversable. As long as no change appears to your Content (and the Webserver is correctly configured for it), the Requests to your Website will correctly get handled by a HTTP-Status 200, which will end up in a Response Time around 1ms and absolutely **no** Load on your Server... and also absolutely **no** Energy used by your Server ;-)

    Analytics data