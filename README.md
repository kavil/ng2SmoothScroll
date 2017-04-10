Angular2 smooth scroll
==============

> base on[Angular smooth scroll](https://github.com/d-oliveros/ngSmoothScroll)

A pure-javascript library and set of directives to scroll smoothly to an element with easing. Easing support contributed by Willem Liu with code from Gaëtan Renaudeau.

No jQuery required.

# Features

  * Exposes a service that scrolls the window to an element's location
  * Provides two directives that enable smooth scrolling to elements.
  * Clean: No classes are added, no jQuery is required, no CSS files or configuration is needed.
  * Scrolling within a custom container added in 2.0.0

# Installation

```js
import { SmoothScrollToDirective, SmoothScrollDirective } from "ng2SmoothScroll";
...
declarations[
	...
	SmoothScrollToDirective,
	SmoothScrollDirective,
	...
]
```

# Bower

Install with bower with:

```bash
bower install ng2SmoothScroll
```

# Usage - As a directive

This module provides two directives:

#### smoothScroll:

Attribute. Scrolls the window to this element, optionally validating the expression inside scroll-if.

Example:
```html

// Basic - The window will scroll to this element's position when compiling this directive
<div smooth-scroll></div>

// With options
<div smoothScroll
	duration="800"
	easing="easeInQuint"
	offset="120"
	callbackBefore="aFunction(element)"
	callbackAfter="anotherFunction">
	{{...}}
</div>

// Inside a custom container
<div smooth-scroll
	duration="800"
	easing="easeInQuint"
	offset="120"
	callbackBefore="aFunction(element)"
	callbackAfter="anotherFunction"
	containerId="container-id">
	{{...}}
</div>

// With condition
<div smoothScroll
	scrollIf="{{ myExpression }}">
	{{...}}
</div>

// Inside ng-repeat
<div smoothScroll
	scrollIf="{{ $last }}"
	duration="2500">
	{{...}}
</div>
```

####scrollTo:

Attribute. Scrolls the window to the specified element ID when clicking this element.

Example:
```html

// Basic
<a href="#"
	scrollTo="my-element-3">
	Click me!
</a>

// Custom containers
<a href="#"
	scrollTo="my-element-3"
	containerId="custom-container-id">
	Click me!
</a>

// onClick for non-anchor tags
<div scrollTo="my-element-3"
	containerId="custom-container-id">
	Click me!
</div>

// With options
<button
	scrollTo="elem-id5"
	duration="1800"
	callbackBefore="aFunction(element)"
	callbackAfter="anotherFunction">
	Scroll to next page.
</button>


```

### Options

#### duration
Type: `Integer`
Default: `800`

The duration of the smooth scroll, in miliseconds.

#### offset
Type: `Integer`
Default: `0`

The offset from the top of the page in which the scroll should stop.

#### easing
type: `string`
default: `easeInOutQuart`

the easing function to be used for this scroll.

#### callbackBefore
type: `function`
default: `function(element) {}`

a callback function to run before the scroll has started. It is passed the
element that will be scrolled to.

#### callbackAfter
type: `function`
default: `function(element) {}`

a callback function to run after the scroll has completed. It is passed the
element that was scrolled to.

#### containerId
type: `string`
default: null

ID of the scrollable container which the element is a child of.

### Easing functions

The available easing functions are:
 * 'easeInQuad'
 * 'easeOutQuad'
 * 'easeInOutQuad'
 * 'easeInCubic'
 * 'easeOutCubic'
 * 'easeInOutCubic'
 * 'easeInQuart'
 * 'easeOutQuart'
 * 'easeInOutQuart'
 * 'easeInQuint'
 * 'easeOutQuint'
 * 'easeInOutQuint'

#### Credits

Callback hooks contributed by Ben Armston.
https://github.com/benarmston

Easing support contributed by Willem Liu.
https://github.com/willemliu

Easing functions forked from Gaëtan Renaudeau.
https://gist.github.com/gre/1650294

Infinite loop bugs in iOS and Chrome (when zoomed) by Alex Guzman.
https://github.com/alexguzman

Support for scrolling in custom containers by Joseph Matthias Goh.
https://github.com/zephinzer

Influenced by Chris Ferdinandi
https://github.com/cferdinandi

Free to use under the MIT License.

Cheers.
