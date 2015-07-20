# query-dom-components
Query your dom components from html and store them into a JavaScript object.

When creating a JavaScript component (carousel, form, header...), it's a best practise to store all the DOM node associated to this component (submit button, navigation arrows...). And it's always really painful to query and declare all the variables associated to the subcomponents. `query-dom-components` allows you to store all these components into a single variable. You just need to prefix their classes with `js-` or the prefix you like and to call `queryDom` with the main container of the component as an option.

## Install

```
$ npm install --save query-dom-components
```

## Usage

```html
<div id="component">
	<div class="js-component-container">
		<span class="js-component-foo"></span>
	</div>
	<a href="#" class="js-component-trigger"></a>
</div>	
```

```js
var queryDom = require('query-dom-components');
var container = document.getElementById('conponent');

/** Instead of doing this
* DOM = {
*		componentContainer: container.querySelector('js-component-container'),
*		componentFoo: container.querySelector('js-component-foo'),
*		...
* };
*/

// Just query All the js-[stuff] classes and store them inside the DOM object
var DOM = queryDom({el: container});
```

## API

### queryDom({options})

#### options

##### el

*Required*
Type: `DOM Node`  
Default: `document.body`

The root container to query the `js-` selectors

##### profix

Type: `string`  
Default: `js-`

The prefix used to query your DOM elements. Default is `js-`

## License

MIT © [Dorian Camilleri](https://github.com/dcamilleri>)
