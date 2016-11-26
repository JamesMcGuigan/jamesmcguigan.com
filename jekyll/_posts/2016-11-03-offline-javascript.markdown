---
layout: post
title:  "Offline Javascript"
date:   2016-11-03
categories: javascript
---

Samir Abid from PaceInsights.com asks:  

> Hi James
>
> Last year we built an analysis system for British Athletics. It's a web app using d3.js, Python and Django. We're looking to do a second generation tool. One of the original challenges was to make the tool function well offline. We did this with some additional hardware ("internet in a box") but this is a bit of a pain.
> 
> What I noticed about your descriptions of your current work is how much you're doing in the browser. I didn't even realise that was possible!
> 
> If you're open to the idea, then I'd welcome the opportunity to discuss how you went about this and understand how we could do the same.
> 
> One other novelty for you to consider was that in our gen1 system is actually controlling several high-speed cameras over wifi (iPhones) and 5 other pieces of measurement equipment. The analysis system goal is to pull all these data streams together, in time sync, in real-time or, if not possible, then within 1 or 2 minutes. Then to have that data available internally online as soon as we're back with a decent internet connection. 
> 
> Anyhow can tell you more if you're interested and open to sharing some of your thoughts. 


# Caching

At McKinsey, I was building ionic iOS demo apps that needed to function without a network connection. One of the tricks is you need to cache all the website resources on the initial page load.

Assuming you are already doing production bundling of javascript assets into a single file, you can also use css image precaching and ng-template cache to force the browser to preload image and html assets for the whole website on initial page load.

```css
body:before { display: none; content: url(image-1.jpg) url(image-2.jpg); }
```
```js
$templateCache.put('templateId.html', 'This is the content of the template');
```

Not actually used it before, but the HTML5 Application Cache also seems to be able to solve much of the above issues, if you can create a script to autogenerate your offline manifest files.

HTTP2 is definitely worth investigating, fairly simple to setup with a few lines of webserver configuration. It provides connection multiplexing (much faster to request multiple files), encryption and compression out of the box, plus a bunch of other new features. HTTP2 also has ServerPush which can be used for similar purposes to request the browser precache files


If you know the full range of API requests that could be made by your application, then it would be possible to write a scraper script in node (or other language) that turns the entire API into a single json file indexed by url. You then just need to inject a piece of middleware into your ```jQuery.ajaxSetup()``` or ```$httpProvider.interceptors[]``` that checks to see if the specific url has already been cached clientside (thus avoiding a HTTP request). File only needs to be generated for the production build, with developers accessing the data via fallback HTTP.


# API

With computational load, sometimes it is better to precache and even precompute intermediate data server side, especially if you are doing animations or otherwise need the browser to be very fast and responsive. This mostly applies when the dataset is fairly static (so its a one-time cost to precompute everything)

For large, constantly updating datasets with a large number of combinatorial possibilities, it can actually pay to offload the calculations to the browser. The API server provides the raw data, and a javascript model layer can then compute any and all derived data in realtime. I did this at Edgefolio for comparing timeseries data between hedge funds.


It is also possible to dynamically build an lazy-load JSON cache, that only creates/updates a cache entry after each HTTP requests. Thus in offline mode, the cache would return any url that had been previously fetched.

The old fashioned way of doing push notifications was Ajax LongPolling or Comet, and then implement some form of event system to distribute notifications throughout the javascript application. I wrote all my push notification / event manager libraries from scratch. I believe the modern way is to use WebSockets and node Socket.IO. Might need a bit of investigation.

The trick would be to have the analysis system (server) figure out when there has been a change in the data, then send a notification event to the browser (either with the data, or a url to trigger a new HTTP request). The client (browser) then fetches this data and store/updates it in its local cache. The application then always accesses data from the local lazy-load cache.

If the browser is going on and offline repeatedly, then a second simple implementation would just be to repeatedly poll (every second) a server url ```/updates-since?timestamp=20161103001325``` which would return a list of urls updated since the given timestamp (an incremental id could also work - but remember that browser and server timestamps may be very different).


# Links

I've put quite a bit of my code up on Github which might be of some inspiration, and here are a few external links that you might find interesting:

CSS Image Precaching in Gulp
- [https://github.com/JamesMcGuigan/edgefolio-gulp-whitelabel-buildchain/blob/master/gulp/tasks/image-precache.js]()

ng-template Caching in Gulp
- [https://github.com/JamesMcGuigan/edgefolio-gulp-whitelabel-buildchain/blob/master/gulp/tasks/templates.js]()
- [https://docs.angularjs.org/api/ng/service/$templateCache]()

Scraping an API into a JSON file for offline unit testing
- [https://github.com/JamesMcGuigan/edgefolio-orm/tree/master/tests/json/api]()
- [https://github.com/JamesMcGuigan/edgefolio-orm/blob/master/tests/unit-preload/angular-mocks/httpBackend.js]()

Webpack which also has features for image/asset bundling
- [https://webpack.github.io/]()

HTML5 Application Cache
- [https://www.html5rocks.com/en/tutorials/appcache/beginner/]()

HTTP Interceptors
- [https://github.com/JamesMcGuigan/edgefolio-gulp-whitelabel-buildchain/blob/master/src/common_components/angular/middleware/apiRedirection.js]()
- [https://docs.angularjs.org/api/ng/service/$http]()

Doing calculations in the webbrowser to offload computation load from the server
- [https://github.com/JamesMcGuigan/edgefolio-orm/blob/master/src/models/timeseries/TimeSeries.js]()

HTTP2
- [https://www.youtube.com/watch?v=fJ0C4zN5uOQ]()
- [https://blog.cloudflare.com/announcing-support-for-http-2-server-push-2/]()

Event Manager Libaries
- [https://github.com/JamesMcGuigan/vml-premierleague-js/tree/master/libs]() (2011)
- [https://github.com/JamesMcGuigan/ft-EventManager]() (2009)
