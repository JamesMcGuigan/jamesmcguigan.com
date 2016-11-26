---
layout: post
title:  "Javascript Quickstart Guide and Ecosystem"
date:   2016-01-26
categories: javascript 
---


I like javascript, it's a very flexible and quite powerful language. 

- You can use it for quick hacks to modify an existing webpage, or write well architected full scale applications. However javascript doesn't enforce any style guidelines or structure on you, you have more than enough rope to hang yourself with unless you have the personal discipline to write well structured code and namespace correctly (avoid polluting the global namespace too much).

- Everything is an object, even functions. You can mix code and data quite easily. You can write inline functions as arguments to other functions. You can dynamically rewrite or wrap functions at runtime. Its also worth understanding the concept of closures and how you can implicitly inject variables into functions via namespacing (but you need a little awareness of how this can potentially lead to memory leaks).

- Separating data from code is a useful pattern. You can do things like write a large config file object (with just the minimal input data required), then write a separate bit of code to parse the config object and apply logic to it. You can also do this with HTML, inject specific attributes into a HTML element, then parse the DOM tree, searching for these attributes and then apply code logic to the element when you find it. This is how angularjs implements directives.

- Cross browser compatibility means being aware of some slightly obscure quirky issues. Trailing comma on object literals will generate a silent compilation failure on IE6 for instance. Trailing commas in arrays will result in an extra undefined item in some browsers. The usual pain point is usually Internet Explorer (v12+ is now called Microsoft Edge). 

- Some newer features, such as Array.prototype.forEach(), are only available in EMCA-5 or EMCA-6 and thus not supported in older browsers. You can check browser compatibility with www.caniuse.com 

- google "EMCA-5 shim" or shiv, for pre-written javascript libraries that manually implement these features.

- Javascript uses prototypal inheritance, which is distinctly different from class based inheritance. Dean Edwards Base Class ([http://dean.edwards.name/weblog/2006/03/base/)]() is one libary for implemeting class based inheritance ontop of prototypal inheritance.

- You can run it serverside with node. You can port node libraries, such as async, to run client side with browserify (browserify.org)


## Some useful libraries

- [http://jquery.com]() - standard DOM manuipulation libary
- [http://d3js.org]() - Data Driven Documents - for data heavy html/svg charts
- [https://lodash.com]() - Very useful functional programming libary
- [http://bluebirdjs.com/docs/getting-started.html]() - Javascript promise and async library
- [http://www.datejs.com/]() - Useful date functions
- [https://modernizr.com/]() - Feature/browser detection libary

## Frameworks

- [https://facebook.github.io/react/]() - The new JSX framework for creating interactive web pages
- [https://angularjs.org]() - Advanced framework for single page apps, and dynamic HTML templates
- [http://backbonejs.org]() - Not used myself, but an alterative class/model layer instead of angular
- [https://www.meteor.com/]() - Single applciation framework for writing both client and server side logic - an alterative to using angular + node
- [http://ionicframework.com/]() - Write iphone/android apps in angularjs

## Server Side

- [https://nodejs.org/]() - Server side javascript
- [https://www.npmjs.com/]() - Node package management - `npm install bower gulp`
- [http://bower.io/]() - Client side javascript libary management - `bower install jquery lodash d3 angular`
- [https://www.npmjs.com/package/gulp-angular-templatecache]() - Angular template caching plugin for gulp (converts all your html template files into a single preloaded file)

## Build Chains

- [http://gulpjs.com/]() - Node base build chain tool, for compressing JS/CSS and doing other static compilation tasks (grunt is the other major alterative), also a tool for watching SASS compilation
- [https://webpack.github.io/]() - Modern javascript and asset bundler with support for ES6 

## CSS
- [http://sass-lang.com/]() - Greatly extended syntax for CSS, such as variables, functions and nested classes and import statetement. Compiles to standard CSS. Very much worth using.
- [https://getbootstrap.com/]() - Quickstart css/js framework for writing simple appications


## Javascript Variants
- [http://coffeescript.org/]() - a slightly more python like syntax, with inbuilt class system and simpler syntax for common operations - compiles to javascript
- [http://www.typescriptlang.org/]() - Allows you to add varible type declarations to your functions - lots of implcit hiniting available in Visual Studio - compiles to javascript
- [http://exploringjs.com/]() - ES6 takes many ideas from ES6 userspace libaries and other programming languages and builds them into the core javascript language   


## IDE
- [https://www.jetbrains.com/idea/]() - This is my favourite IE at the moment, its a paid product but they have done alot of work to make your life as a programmer eaiser


## Lint
- [http://www.javascriptlint.com/]() - Catches syntax errors, trailing commas and missing variable declartations 


## Version Control
- [https://git-scm.com/]() - GIT - "Subversion used to say CVS done right: with that slogan there is nowhere you can go. There is no way to do cvs right." - Linus Torvalds


## Browser Dev Tools
- [https://developer.chrome.com/devtools]() - Chrome Developer Tools - my new favourite
- [https://getfirebug.com/]() - Firefox Firebug - this used to be the best browser debugger during the IE6 days    


## Cross Browser Testing
- [https://dev.windows.com/en-us/microsoft-edge/tools/vms/mac/]() - VMware images for older versions of IE - best way to do cross browser IE testing is in a VM


## Hosting
- [https://digitalocean.com]() - Digital Ocean - easy virtual machines with $5/month microservers
- [https://aws.amazon.com/]() - AWS - large scale cloud computing, with advanced features for autodeploying server clusters
- [https://www.rackspace.co.uk/]() - Rackspace - Expensive managed hosting with professional DevOps technical support
