ng-juxtapose [![Build Status](https://travis-ci.org/tinesoft/ng-juxtapose.svg)](https://travis-ci.org/tinesoft/ng-juxtapose)[![devDependency Status](https://david-dm.org/tinesoft/ng-juxtapose/dev-status.svg)](https://david-dm.org/tinesoft/ng-juxtapose#info=devDependencies)
===========================================================================================================================================

AngularJS directive for [JuxtaposeJS](https://juxtapose.knightlab.com/), a JavaScript library for making before/after image sliders.

Demo: http://tinesoft.github.io/ng-juxtapose

### Installation

Using bower:

```
$ bower install ng-juxtapose --save
```

Using npm:

```
$ npm install ng-juxtapose --save
```

### How to use it

ng-juxtapose depends on [JustaposeJS](https://github.com/NUKnightLab/juxtapose) library (the dependency should be automatically installed by bower/npm).

1. Add a link to the **Juxtapose CSS** in the ```<head>``` section of your index.html file , as such:

```
<link href="path/to/juxtapose.css" rel="stylesheet">
```

2. Add reference to  **JustaposeJS** and Angular scripts:

```
<script type="text/javascript" src="path/to/juxtapose.min.js"></script>
<script type="text/javascript" src="path/to/angular.min.js"></script>
```

3. Add a reference to the ng-juxtapose script:

```
<script type="text/javascript" src="path/to/ng-juxtapose.min.js"></script>
```

4. Inject `ngJuxtapose` in your application module:

```
angular.module('myApp', ['ngJuxtapose']);
```

and then just add an `juxtapose` tag, for example:

```
<juxtapose
	before-image-url="'http://online.wsj.com/media/LIONDOORA.jpg'" 
	after-image-url="'http://online.wsj.com/media/LIONDOOR_2A.jpg'">
</juxtapose>
```

### Options

##### Directive Options:

> The **before image** refers to the image on the left (resp. on top) in case of **vertical** (resp. **horizontal**) orientation.

> The **after image** refers to the image on the right (resp. at the bottom) in case of **vertical** (resp. **horizontal**) orientation.

* `before-image-url` : the URL to the before image
* `before-image-label` : the label of the before image (displayed on top of the image)
* `before-image-credit` : the credit for the before image (displayed as overlay, below the 2 images)
* `before-image-alt` : the alternate  text  (`alt`) for the before image

* `after-image-url` : the URL to the after image
* `after-image-label` : the label of the after image (displayed as overlay, on top of the image)
* `after-image-credit` : the credit for the after image (displayed below the 2 images)
* `after-image-alt` : the alternate  text  (`alt`) for the after image


Example with some above features:

```
<juxtapose 
	before-image-url="'http://online.wsj.com/media/LIONDOORA.jpg'" before-image-label="'Maidan square in 2009'" before-image-credit="'WSJ'"
	after-image-url="'http://online.wsj.com/media/LIONDOOR_2A.jpg'" after-image-label="'Maidan square in 2014'" after-image-credit="">
</juxtapose>
```

##### Config Options:

* `starting-position` : the slider start position (default is `50%`, at the middle of the two images)
* `show-labels` : indicates if image labels must be displayed. You must have labels for both images, or they won't be shown, even if `true` is set (default is `true`)
* `show-credits` : indicates if image credits must be displayed below the slider. You must have credits for both images, or they won't be shown, even if `true` is set (default is `true`)
* `animate` : If `true`, the divider will glide to the point where someone clicks; otherwise, it will jump (default is `true`)
* `vertical` : If `true`, the divider will move vertically instead of horizontally (default is `true`)

These options can be configured globally for all your `juxtapose` directives, by using the **juxtaposeConfigProvider**, in the `config` section of your app.

Example:

```
angular.module('yourApp', [])
	.config(['juxtaposeConfigProvider', function(juxtaposeConfigProvider){

		juxtaposeConfigProvider.setStartingPosition('80%');
		juxtaposeConfigProvider.setShowLabels(false);
		//...set other properties here

	}]);
```

They can also be set directly on each directive as DOM attributes. In this case, the values specified in the DOM **take precedence over the ones from the config**!.

Example:

```
<juxtapose  starting-position="45%"  show-credits="false" animate="false" vertical="false"
	before-image-url="'http://online.wsj.com/media/LIONDOORA.jpg'" before-image-label="'Maidan square in 2009'" before-image-credit="'WSJ'"
	after-image-url="'http://online.wsj.com/media/LIONDOOR_2A.jpg'" after-image-label="'Maidan square in 2014'" after-image-credit="">
</juxtapose>

```
### Build

You can run the tests by cloning the repo and then (inside the project folder) running

```
$ npm install
$ bower install
$ grunt watch
```

assuming you already have `grunt` installed, otherwise you also need to do:

```
$ npm install -g grunt-cli
```

### License

Copyright (c) 2015 Tine Kondo. Licensed under the MIT License (MIT)


### Thanks To

JuxtaposeJS is one of a series of tools for content creators produced by the Northwestern University Knight Lab. It was created by Medill student [Alex Duner](http://www.twitter.com/asduner/). This plugin is built on top of his great work. So thanks to him!