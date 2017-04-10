import { Directive, Input, HostListener } from '@angular/core';

@Directive({
	selector: '[scrollTo]'
})

export class SmoothScrollToDirective {
	targetElement: any;
	callbackBeforeEx: any;
	callbackAfterEx: any;

	constructor() { }

	@Input() scrollTo: any;
	@Input() duration: number;
	@Input() offset: number;
	@Input() easing: string;
	@Input() callbackBefore: any;
	@Input() callbackAfter: any;
	@Input() containerId: string;

	@HostListener('click') onClick() {

		this.targetElement = document.getElementById(this.scrollTo);
		if (!this.targetElement) return;
		let _callbackBefore = this.callbackBefore;
		let callbackBefore = function (element) {
			if (_callbackBefore) {
				let exprHandler = this.callbackBeforeEx({ element: element });
				if (typeof exprHandler === 'function') {
					exprHandler(element);
				}
			}
		};

		let _callbackAfter = this.callbackAfter;
		let callbackAfter = function (element) {
			if (_callbackAfter) {
				let exprHandler = this.callbackAfterEx({ element: element });
				if (typeof exprHandler === 'function') {
					exprHandler(element);
				}
			}
		};

		new SmoothScroll(this.targetElement, {
			duration: this.duration,
			offset: this.offset,
			easing: this.easing,
			callbackBefore: callbackBefore,
			callbackAfter: callbackAfter,
			containerId: this.containerId
		});
	};

}

@Directive({
	selector: '[smoothScroll]'
})

export class SmoothScrollDirective {

	constructor() { }

	@Input() scrollIf: any;
	@Input() duration: number;
	@Input() offset: number;
	@Input() easing: string;
	@Input() callbackBefore: any;
	@Input() callbackAfter: any;
	@Input() containerId: string;

	@HostListener('click', ['$event.target']) onClick(target) {

		if (typeof this.scrollIf === 'undefined' || this.scrollIf === 'true') {
			setTimeout(function () {

				var callbackBefore = function (element) {
					if (this.callbackBefore) {
						var exprHandler = this.callbackBefore({ element: element });
						if (typeof exprHandler === 'function') {
							exprHandler(element);
						}
					}
				};

				var callbackAfter = function (element) {
					if (this.callbackAfter) {
						var exprHandler = this.callbackAfter({ element: element });
						if (typeof exprHandler === 'function') {
							exprHandler(element);
						}
					}
				};

				new SmoothScroll(target, {
					duration: this.duration,
					offset: this.offset,
					easing: this.easing,
					callbackBefore: callbackBefore,
					callbackAfter: callbackAfter,
					containerId: this.containerId
				});
			}, 0);
		}
	};

}


class SmoothScroll {
	constructor(element: any, options: any) {
		this.smoothScroll(element, options);
	}
	private smoothScroll(element, options) {
		options = options || {};

		// Options
		var duration = options.duration || 800,
			offset = options.offset || 0,
			easing = options.easing || 'easeInOutQuart',
			callbackBefore = options.callbackBefore || function () { },
			callbackAfter = options.callbackAfter || function () { },
			container = document.getElementById(options.containerId) || null,
			containerPresent = (container != undefined && container != null);

		/**
		 * Retrieve current location
		 */
		var getScrollLocation = function () {
			if (containerPresent) {
				return container.scrollTop;
			} else {
				if (window.pageYOffset) {
					return window.pageYOffset;
				} else {
					return document.documentElement.scrollTop;
				}
			}
		};

		/**
		 * Calculate easing pattern.
		 *
		 * 20150713 edit - zephinzer
		 * - changed if-else to switch
		 * @see http://archive.oreilly.com/pub/a/server-administration/excerpts/even-faster-websites/writing-efficient-javascript.html
		 */
		var getEasingPattern = function (type, time) {
			switch (type) {
				case 'easeInQuad': return time * time; // accelerating from zero velocity
				case 'easeOutQuad': return time * (2 - time); // decelerating to zero velocity
				case 'easeInOutQuad': return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
				case 'easeInCubic': return time * time * time; // accelerating from zero velocity
				case 'easeOutCubic': return (--time) * time * time + 1; // decelerating to zero velocity
				case 'easeInOutCubic': return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
				case 'easeInQuart': return time * time * time * time; // accelerating from zero velocity
				case 'easeOutQuart': return 1 - (--time) * time * time * time; // decelerating to zero velocity
				case 'easeInOutQuart': return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
				case 'easeInQuint': return time * time * time * time * time; // accelerating from zero velocity
				case 'easeOutQuint': return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
				case 'easeInOutQuint': return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
				default: return time;
			}
		};

		/**
		 * Calculate how far to scroll
		 */
		var getEndLocation = function (element) {
			var location = 0;
			if (element.offsetParent) {
				do {
					location += element.offsetTop;
					element = element.offsetParent;
				} while (element);
			}
			location = Math.max(location - offset, 0);
			return location;
		};

		// Initialize the whole thing
		setTimeout(function () {
			var currentLocation = null,
				startLocation = getScrollLocation(),
				endLocation = getEndLocation(element),
				timeLapsed = 0,
				distance = endLocation - startLocation,
				percentage,
				position,
				scrollHeight,
				internalHeight;

			/**
			 * Stop the scrolling animation when the anchor is reached (or at the top/bottom of the page)
			 */
			var stopAnimation = function () {
				currentLocation = getScrollLocation();
				if (containerPresent) {
					scrollHeight = container.scrollHeight;
					internalHeight = container.clientHeight + currentLocation;
				} else {
					scrollHeight = document.body.scrollHeight;
					internalHeight = window.innerHeight + currentLocation;
				}

				if (
					( // condition 1
						position == endLocation
					) ||
					( // condition 2
						currentLocation == endLocation
					) ||
					( // condition 3
						internalHeight >= scrollHeight
					)
				) { // stop
					clearInterval(runAnimation);
					callbackAfter(element);
				}
			};

			/**
			 * Scroll the page by an increment, and check if it's time to stop
			 */
			var animateScroll = function () {
				timeLapsed += 16;
				percentage = (timeLapsed / duration);
				percentage = (percentage > 1) ? 1 : percentage;
				position = startLocation + (distance * getEasingPattern(easing, percentage));
				if (containerPresent) {
					container.scrollTop = position;
				} else {
					window.scrollTo(0, position);
				}
				stopAnimation();
			};
			callbackBefore(element);
			var runAnimation = setInterval(animateScroll, 16);
		}, 0);

	}
}
