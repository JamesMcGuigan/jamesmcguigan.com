# jamesmcguigan.com


## Install

```
sudo gem install bundler
bundler install
npm install
typings install
```

## Build Development
```
jekyll build --incremental --watch
webpack-dev-server

jekyll serve --incremental --watch
webpack --watch
(cd jekyll-static; python -m SimpleHTTPServer 4000);
open http://localhost:4000
```

## Build Production
```
jekyll clean
jekyll build
webpack --optimize-dedupe --optimize-minimize
```
