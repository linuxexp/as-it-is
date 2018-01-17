[![Build Status](https://travis-ci.org/linuxexp/angular-material-common.svg?branch=master)](https://travis-ci.org/linuxexp/angular-material-common)

Boilerplate code to build full-blown Test Driven apps using angular, angular-material, Travis CICD

To Get Started
==

Install node dependencies 
```
npm install
```

Install bower dependencies 
```
bower install
```

Start development server 
```
npm start
```

Development can be accessed at `http://localhost:8080/`

Build distribution package 
```
npm run build
```

You can preview the build locally using python's SimpleHTTPServer module like
```bash
cd dist/
python -m SimpleHTTPServer
```

Build can be accessed at `http://localhost:8000/`

Run Unit Tests
```
npm test
```

Continuous Integration & Continuous Integration
===
Travis CICD is integrated by default. Integrating with any other CICD is trivial.


In the box
===========
* Webpack 2
* Webpack loaders for CSS, SCSS, ngTemplate-loader, HTML, Font, file-loader (png, jpeg, gif)
* Babel ES6
* Webpack Development Server
* AngularJS
* Angular-ui-router
* Angular-material
* Material design icons
* Lodash
* Travis CICD
* Karma
* Mocha
* Chai
* Angular-mocks



License
========
Released under creative commons license
