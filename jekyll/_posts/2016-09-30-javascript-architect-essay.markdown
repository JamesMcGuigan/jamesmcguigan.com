---
layout: post
title:  "Javascript Architect Essay"
date:   2016-09-30
categories: javascript architecture
---

# Linguistics 

My computer programming style is very thoughtful. I try to consider the full-project-lifecycle implications of each programming decision and why none of the alternative decision are better. A linguistic first development style starts with the question: “Ideally, how would you like to express this problem's logic and information?”. Good language allows complex concepts to be communicated with minimal human cognitive load. Bad language forces you to think about the language itself rather than the problem at hand.

My ORM model layer turns an multi-endpoint asynchronous API into linguistically concise fully-recursive lazy-loading json object. This is an example of good language.
- [https://github.com/JamesMcGuigan/edgefolio-orm]()


# Creating large scale angular apps

One of the key challenges in large scale codebases is keeping the complexity space of any individual problem manageable and self-contained.

If human working memory is 7±2 slots, and 3 are wastefully distracted by language, then the complexity space capacity of the working memory is not simply 4/7 slots but a massive factorial decrease for 4!/7! connections. Human cognitive load is the most scarce technical resource in all of problem solving. 

Hidden complexity is when a change in one part of the codebase will have knock on effects that the developer is not aware of, or change the assumptions being relied upon by another developer. This is dangerous and logic within computer systems needs to be fully self-consistent. "You don't have conversations with microprocessors. You tell them what to do, then helplessly watch the disaster when they take you literally!" - David Brin 

Some of the key tools in managing complexity in large scale codebases are: abstraction, separation of configuration and implementation, stratified design, don't repeat yourself, functional programming, state machines, deterministic data flows and keeping complexity self-contained behind clean interfaces. 

Static type checking, linting, and unit/integration tests are all very useful tools for validating correctness.

# Abstraction

> "Being abstract is something profoundly different from being vague … The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise."
> #### -- Edsger W. Dijkstra

Abstraction reduces complexity by taking multiple similar objects and turns them into one type of object. Abstraction separates what information is the same, what key pieces of information are different and can hide the bulk of the complexity by declaring it irrelevant for the problem at hand. This allows reuse of code for all instances of the same abstract type, it allows an entire class of problem to be solved in a single self-contained piece of code. Abstraction allows complexity to be hidden (and comprehensively tested) behind a clean interface, thus allowing the complexity of other problems that depend upon it to be reduced.
 
Separating configuration from implementation allows the configuration to become a domain specific language. This allows for high-level linguistic programming by expressing business logic in terms of configuration information and a pipeline of transformations. 

> "We have also obtained a glimpse of another crucial idea about languages and program design. This is the approach of statified design, the notion that a complex system should be structured as a sequence of levels that are described using a sequence of languages. Each level is constructed by combining parts that are regarded as primitive at that level, and the parts constructed at each level are used as primitives at the next level. The language used at each level of a stratified design has primitives, means of combination, and means of abstraction appropriate to that level of detail." 
> #### -- H. Abelson and G. Sussman (in "The Structure and Interpretation of Computer Programs)


# Setting up a project - workflow

A machine is fast, reliable and repeatable. To the extent possible, a developer's workflow should be fully automated. 

Don't repeat yourself means that for all information there should be a single source of truth. Sometimes derived information is required, such as injecting pixel sizes for filesystem images into SCSS. An un-automated workflow would require breaking concentration from the current high level task, manually inspecting the image file, typing out the image filename and dimensions (with potentual typos) whilst trying to remember informal project naming conventions. Editing an existing image file would require a human to remember to grep through the codebase and manually update all code references. A developer in a rush may forget to do this, or may fail to update all code references. This leads to a potentially inconsistent codebase that is hard to verify as correct. A single operation may require minutes of developer time. Minor pixel alignment bugs due to inconsistent codebase may requires hours of developer time between filing a bug report, locating the offending lines of code, testing this has not broken anything else and committing back to source control.

A fully automated workflow would contain a script that reads the image directory, and outputs SCSS image variables and class names with predetermined naming convention. CSS rules are defined in terms of SCSS variables and offsets. Updating an image file will automatically propagate, via file watcher, this change of pixel size information throughout the entire codebase in a deterministic manner. The list of available images should even be visible through IDE autocomplete of SCSS variable names. A single operation requires only seconds of developer time and avoids context switching out of the original high-level programming task.

PostCSS uses CSS3 as the single source of truth and automatically injects vendor specific prefixes as derived information. The information for the choice of vendor prefixes is then reduced to a single configuration variable, rather than requiring a codebase wide refactoring. This reduces code complexity, maintenance effort and human attention units.

This is the first of Larry Wall's Three Virtues of a programmer: 
> Laziness: The quality that makes you go to great effort to reduce overall energy expenditure. It makes you write labor-saving programs that other people will find useful and document what you wrote so you don't have to answer so many questions about it.
>
> Impatience: The anger you feel when the computer is being lazy. This makes you write programs that don't just react to your needs, but actually anticipate them. Or at least pretend to.
>
> Hubris: The quality that makes you write (and maintain) programs that other people won't want to say bad things about.
> #### -- Larry Wall


Here is my documented whitelabel Gulp build chain for ES5 and Angular 1.x
- [https://github.com/JamesMcGuigan/edgefolio-gulp-whitelabel-buildchain]()


# Setting up a project - deployment

A second key element of automation is repeatability. Ask a human to do the same task a hundred times and even for the simplest task they are bound to make mistake, sometimes they will type in something wrong, miss out a step, add in something new or change the order of things where they think it doesn't matter. A machine will repeat the same task exactly the same way every time, and even it gets it wrong, it will be wrong in exactly the same time every way too. Humans are unreliable. Never trust a human to do a machine's job.

Obscure bugs often require being able to isolate the exact differences in environment and code between a working state and broken state. A fully deterministic server configuration and build/deploy process dramatically reduces the number of possible places a bug could be hiding. A bugfix patch can be determined as the only difference between a working and buggy state. This also avoids the possibility of spending hours chasing an unrepeatable bug caused by one-time human error in the deployment process.

Server setup is an extension of the deployment process. Various tools such as Puppet, Ansible, Docker exist that allow the entirety of server configuration from a unix image to be converted into source code and checked into version control. This is deterministic, repeatable and idempotent.

At the highest level of linguistics, website deployment should also be reduced to a single word command "deploy-production". This provides a deterministic output, starting with the source code repository, linting, testing, preprocessing, compilation, concatenation, text transformations with the output being a set of files production optimised for the web browser.

Here is an example of a Puppet server configuration
- [https://github.com/JamesMcGuigan/puppet-config]()


# Inheritance

One language method of describing a problem is to explain it out in full detail longhand. This can get quite verbose and difficult to maintain if you are describing lots of problems that are mostly similar but slightly different. Inheritance is one method of describing a group of similar problems in terms of their common functionality, and the succinct differences between individual items. 

The old Premier League website was built as an object oriented widget library using inheritance. The BaseWidget acted much like an angular directive. It provided a means to auto-initalize javascript onto the page, naming conventions for accessing and validating the dom and html parameters. It also provided standardised destructor functions. SvgWidget extended BaseWidget and would create an empty ```<div class='svg-wrapper'><svg/></div>``` element, with an svg border, background and text label. Utility functions would compute height, width and pixel offsets needed for basic drawing operations.

These standardised base widgets dramatically simplify the developer task of creating a new display widget. Specify the default parameters, validation options and then draw directly onto a blank Raphael svg canvas. The framework makes common things easy to say. Creating a new widget can now be handed over to a junior developer who does not need to understand the full complexity of the application. 

VML Premier League Widget Library
- [https://github.com/JamesMcGuigan/vml-premierleague-js/]()


# Middleware 

Middleware allows for separation of cross-cutting orthogonal concerns (this is one implementation of aspect orientated programming).

Middleware requires describing the problem as a function of the request or the response object, and can also be used for events such as angular state transitions. It guarantees this logic will be applied consistently throughout the application. It is often useful to configure middleware using a global configuration file. 

Examples where middleware may be useful: debug and analytics logging, cache invalidation, conditional api redirection, remapping legacy api schemas, url interoperation, csrf tokens, 

It is important that developers are aware of the middleware transformations that exist within a project. It keeps logic for individual concerns self-contained, but implicitly affects the interfaces for every other piece of code. Bugs in middleware can appear in apparently unrelated pieces of functionality and can be non-obvious to trace back to their root cause.
 

# Modular platform, with multiple applications in one united platform

This requires separating out which parts of the problem space are specific to the individual application, which parts are common between all applications and which parts of the problem space are generic enough to solved independently and managed through a configuration file.

Angular uses modules to namespace dependancy injection. This requires fully tracing through the dependancy tree of which modules are dependant on code in external angular modules. Ideally most modules will be relatively self-contained. It is possible to use the angular module system to inject a choice between application specific modules sharing a common DI interface, a GlobalConfig  injection would be a good example of where this might be useful.

A second related problem is that the build chain needs to be aware of recursive module dependancies. RequireJs and asynchronous loading is one option, but most production deployments rely on a single minified javascript bundle. Webpack is one modern solution which can trace require() and ES6 import statements. At Edgefolio I wrote a custom gulp build chain and added an .includes.conf text file with each module, that could recursively reference other .includes.conf files to indicate module dependancies. Deduplication, ordering and circular dependancies where handled implicitly.

A second type of multiple application is a whitelabel setup. The wrong way to do this is to have a separate git branch for every white label client, as the complexity of repeatedly merging implementation changes between branches quickly becomes unmaintainable with more than a handful of branches. Information wise, the problem can be reduced to a single code implementation wth small whitelabel-specific change in variable configuration. Javascript and SCSS variables can be extracted into a series of structured json files. The buildchain can be passed a --whitelabel flag and the application configuration becomes the _.merge() of the default json and the whitelabel-specific override json file. Angular and SCSS versions of the combined configuration variables are then auto-generated. This reduces the information complexity of the surface of differences from an entire codebase to a single structured json file. 

The whitelabel build system also uses file/directory-name conventions to append or replace scss, javascript, html or image assets. This ensures feature completeness with git branching and the abstraction is not limited to just a subset of common usecases. 

Here is my documented whitelabel Gulp build chain for ES5 and Angular 1.x
- [https://github.com/JamesMcGuigan/edgefolio-gulp-whitelabel-buildchain]()


# Coordinating projects with different teams (in this case 7/8)

The most efficient development team is a single developer who can keep the entire codebase and every programming decision in memory. At Edgefolio, I was just about able to do this with a 28k line javascript codebase. There is a limit to how far a single developer can scale. Multiple teams of developers means no single developer will have full awareness of the entire project.

Communication between developers is slow and suffers from the combinatorial explosion of possible communication channels. This is the root cause of the mythical man month.

The simplest programming problem involves fully self-contained logic with a well defined interactions to the rest of the codebase. This keeps the complexity of the task being assigned to the developer simple. Developers need awareness of the existing libraries, abstractions and patterns to avoid increasing complexity by constantly reinventing the wheel. The complexity of tasks assigned needs to fit inside a single human head.

Core libraries are abstractions designed for reuse. Linguistically this is creating a new subset of language for other developers to use. Thought it required about what information external code has access to, what information needs to be passed in and what information can be inferred. Design by contract explicitly clarifies the assumptions that can be made about the code. From an external developer perspective, documentation allows for a more rapid understanding of the external interface to the library. Exhaustive testing gives the developer peace of mind that the bugs he encounters are his own. Chasing bugs caused by external libraries can waste many hours of development time. 

Ideally core libraries should be field tested by use in external code, to check for completeness and ease of use. Ideally two implementations. Once core library code has been released, it breaking changes cannot be made without inspecting all other code that depends upon it and possibly a large scale refactoring operation throughout the entire codebase. Developers also need to be informed if the assumptions they rely upon have been changed. Open source libraries use versioning, documentation and changelogs to help with this. 

Well defined interfaces between self-contained pieces of logic is the simplest way to avoid developers making conflicting logical decisions. Pair programming and code review may help to improve technical awareness of abstractions, programming decisions, and available functionality within the larger scale codebase.
 
Abstraction requires understanding the full differences and similarities throughout an entire class of problem. This requires a full visualisation inside a single human head, but if the general problem can be solved, this reduces multiple implementations into a single implementation and reduces future developer effort to that of solving the configuration file. Implementing abstractions after the fact may require large scale refactoring operations, with associated testing of legacy code. The balance is between short term effort and team coordination and long term combinatorial code complexity.

