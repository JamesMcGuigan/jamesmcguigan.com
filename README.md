# jamesmcguigan.com


## Install

```
bundler install
cd jekyll
jekyll clean;

jekyll build  --incremental --watch;
(cd jekyll/_site; python -m SimpleHTTPServer 8000)

jekyll serve --incremental --watch
open http://127.0.0.1:4000/
```
