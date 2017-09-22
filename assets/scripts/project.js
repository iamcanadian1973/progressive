"use strict";

/*! 
* jQuery Double Tap To Go - v1.0.0 - 2015-04-20
* http://github.com/zenopopovici/DoubleTapToGo
* Copyright (c) 2015 Graffino
*/
!function ($, window, document, undefined) {
  $.fn.doubleTapToGo = function (action) {
    return "ontouchstart" in window || navigator.msMaxTouchPoints || navigator.userAgent.toLowerCase().match(/windows phone os 7/i) ? (this.each("unbind" === action ? function () {
      $(this).off(), $(document).off("click touchstart MSPointerDown", handleTouch);
    } : function () {
      function handleTouch(e) {
        for (var resetItem = !0, parents = $(e.target).parents(), i = 0; i < parents.length; i++) {
          parents[i] == curItem[0] && (resetItem = !1);
        }resetItem && (curItem = !1);
      }var curItem = !1;$(this).on("click", function (e) {
        var item = $(this);item[0] != curItem[0] && (e.preventDefault(), curItem = item);
      }), $(document).on("click touchstart MSPointerDown", handleTouch);
    }), this) : !1;
  };
}(jQuery, window, document);
'use strict';

// The MIT License (MIT)

// Copyright (c) 2015 BG Stock - html5backgroundvideos.com

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

(function ($) {

	// Add js class to html
	$('html').addClass('js');

	// Add IE8 shim for Date.now()
	if (!Date.now) {
		Date.now = function () {
			return new Date().getTime();
		};
	}

	// Return current time in seconds
	function currentTime() {
		return Math.floor(Date.now() / 1000);
	}

	// The plugin
	$.fn.bgVideo = function (options) {

		// @bool iOS
		var iOS = /iPad|iPhone|iPod/.test(navigator.platform) || /iPad|iPhone|iPod/.test(navigator.userAgent);

		// Settings
		var settings = $.extend({}, $.fn.bgVideo.defaults, options);

		// Do the things
		return this.each(function () {

			// Set some handy variables
			var $video = $(this); // jQuery Object
			var video = $video[0]; // DOM node
			var poster = $video.attr('poster') || '';
			var $container = $video.parent();
			var $pauseplay = $('<button class="jquery-background-video-pauseplay pause"><span>Pause</span></button>');
			var start_time; // We'll set this when it starts playing


			// Check for any data attributes that will override the settings for this particular element
			var el_settings = $.extend({}, settings);
			var data_attrs = $video.data();
			$.each(data_attrs, function (data_name, data_val) {
				if (data_name.indexOf('bgvideo') === 0) {
					// It's a match! Strip the bgvideo prefix and lowercase the first letter
					data_name = data_name.replace('bgvideo', '');
					data_name = data_name.charAt(0).toLowerCase() + data_name.slice(1);
					// Then set the setting
					el_settings[data_name] = data_val;
				}
			});

			// Attach to playing event
			$video.on('playing', function () {
				start_time = currentTime();
				$video.addClass('is-playing is-visible');
				$pauseplay.removeClass('play').addClass('pause').find('span').text('Pause');
				$.fn.bgVideo.fitVideo($video);
			});

			// If the video is already playing before js loads
			if (video.currentTime > 0) {
				$video.addClass('is-playing is-visible');
			}

			// Attach to pause event
			$video.on('pause', function () {
				$video.removeClass('is-playing');
				$pauseplay.removeClass('pause').addClass('play').find('span').text('Play');
				if (el_settings.fadeOnPause) {
					$video.removeClass('is-visible');
				}
			});

			// Set default styles
			$container.css({
				'position': 'relative',
				'overflow': 'hidden',
				'background-size': 'cover',
				'background-position': 'center center',
				'background-repeat': 'no-repeat',
				'background-image': 'url(' + poster + ')'
			});
			$video.css({
				'min-width': 'auto',
				'min-height': 'auto',
				'width': '100%',
				'height': 'auto',
				'position': 'absolute',
				'left': '50%',
				'top': '50%',
				'transform': 'translate(-50%,-50%)'
			});
			if (el_settings.fullScreen) {
				$container.css({
					'position': 'fixed',
					'top': '0',
					'bottom': '0',
					'left': '0',
					'right': '0',
					'height': 'auto',
					'margin': '0',
					'z-index': '-1'
				});
			}

			// Fade in video by setting the transition duration
			$video.css('transition-duration', el_settings.fadeIn + 'ms');

			// Remove on iOS
			if (iOS) {
				// Unset sources to prevent them from continuing to download
				$video.attr('src', '');
				$video.find('source').attr('src', '');
				$video.remove();
			}

			// Mimic background-size: cover with video element
			$.fn.bgVideo.fitVideo($video);
			$(window).resize(function () {
				$.fn.bgVideo.fitVideo($video);
			});

			// Pause after X seconds
			el_settings.pauseAfter = parseInt(el_settings.pauseAfter, 10);
			if (el_settings.pauseAfter > 0) {
				$video.on('timeupdate', function () {
					var now = currentTime();
					if (now > start_time + el_settings.pauseAfter) {
						video.pause();
						if (el_settings.fadeOnEnd) {
							$video.removeClass('is-visible');
						}
					}
				});
			}

			// Play / pause button
			if (el_settings.showPausePlay) {
				// Append pauseplay element created earlier
				$container.append($pauseplay);
				// Position element
				$pauseplay.css({
					'left': 'auto',
					'right': 'auto',
					'top': 'auto',
					'bottom': 'auto'
				});
				$pauseplay.css(el_settings.pausePlayXPos, el_settings.pausePlayXOffset);
				$pauseplay.css(el_settings.pausePlayYPos, el_settings.pausePlayYOffset);
				if (el_settings.pausePlayXPos === 'center') {
					$pauseplay.css({
						'left': '50%',
						'margin-left': '-10px'
					});
				}
				if (el_settings.pausePlayYPos === 'center') {
					$pauseplay.css({
						'top': '50%',
						'margin-top': '-10px'
					});
				}
				// Add functionality
				$pauseplay.on('click', function () {
					if (video.paused) {
						video.play();
					} else {
						video.pause();
					}
				});
			}
		});
	};

	// Default settings
	$.fn.bgVideo.defaults = {
		fullScreen: false, // Sets the video to be fixed to the full window
		fadeIn: 500, // Milliseconds to fade video in/out (0 for no fade)
		pauseAfter: 120, // Seconds to play before pausing (0 for forever)
		fadeOnPause: false, // For all (including manual) pauses
		fadeOnEnd: true, // When we've reached the pauseAfter time
		showPausePlay: true, // Show pause/play button
		pausePlayXPos: 'right', // left|right|center
		pausePlayYPos: 'top', // top|bottom|center
		pausePlayXOffset: '15px', // pixels or percent from side - ignored if positioned center
		pausePlayYOffset: '15px' // pixels or percent from top/bottom - ignored if positioned center
	};

	// Fit video
	$.fn.bgVideo.fitVideo = function ($video) {

		var $container = $video.parent(),
		    container_height = $container.outerHeight(),
		    container_width = $container.outerWidth();

		// Do this again every time the screen size changes
		$video.css({
			'height': 'auto',
			'width': container_width + 'px'
		});

		var video_height = $video.height();

		if (container_height > video_height) {
			//console.log('Container height > video height');
			$video.css({
				'height': container_height + 'px',
				'width': 'auto'
			});
		}
	};

	// Auto run based on data attributes
	$(document).ready(function () {
		$('[data-bgvideo]').bgVideo();
	});
})(jQuery);
"use strict";

/*
 * Collapse plugin for jQuery
 * --
 * source: http://github.com/danielstocks/jQuery-Collapse/
 * site: http://webcloud.se/jQuery-Collapse
 *
 * @author Daniel Stocks (http://webcloud.se)
 * Copyright 2013, Daniel Stocks
 * Released under the MIT, BSD, and GPL Licenses.
 */

(function ($, exports) {

  // Constructor
  function Collapse(el, options) {
    options = options || {};
    var _this = this,
        query = options.query || "> :even";

    $.extend(_this, {
      $el: el,
      options: options,
      sections: [],
      isAccordion: options.accordion || false,
      db: options.persist ? jQueryCollapseStorage(el.get(0).id) : false
    });

    // Figure out what sections are open if storage is used
    _this.states = _this.db ? _this.db.read() : [];

    // For every pair of elements in given
    // element, create a section
    _this.$el.find(query).each(function () {
      new jQueryCollapseSection($(this), _this);
    });

    // Capute ALL the clicks!
    (function (scope) {
      _this.$el.on("click", "[data-collapse-summary] " + (scope.options.clickQuery || ""), $.proxy(_this.handleClick, scope));

      _this.$el.bind("toggle close open", $.proxy(_this.handleEvent, scope));
    })(_this);
  }

  Collapse.prototype = {
    handleClick: function handleClick(e, state) {
      e.preventDefault();
      state = state || "toggle";
      var sections = this.sections,
          l = sections.length;
      while (l--) {
        if ($.contains(sections[l].$summary[0], e.target)) {
          sections[l][state]();
          break;
        }
      }
    },
    handleEvent: function handleEvent(e) {
      if (e.target == this.$el.get(0)) return this[e.type]();
      this.handleClick(e, e.type);
    },
    open: function open(eq) {
      this._change("open", eq);
    },
    close: function close(eq) {
      this._change("close", eq);
    },
    toggle: function toggle(eq) {
      this._change("toggle", eq);
    },
    _change: function _change(action, eq) {
      if (isFinite(eq)) return this.sections[eq][action]();
      $.each(this.sections, function (i, section) {
        section[action]();
      });
    }
  };

  // Section constructor
  function Section($el, parent) {

    if (!parent.options.clickQuery) $el.wrapInner('<a href="#"/>');

    $.extend(this, {
      isOpen: false,
      $summary: $el.attr("data-collapse-summary", ""),
      $details: $el.next(),
      options: parent.options,
      parent: parent
    });
    parent.sections.push(this);

    // Check current state of section
    var state = parent.states[this._index()];

    if (state === 0) {
      this.close(true);
    } else if (this.$summary.is(".open") || state === 1) {
      this.open(true);
    } else {
      this.close(true);
    }
  }

  Section.prototype = {
    toggle: function toggle() {
      this.isOpen ? this.close() : this.open();
    },
    close: function close(bypass) {
      this._changeState("close", bypass);
    },
    open: function open(bypass) {
      var _this = this;
      if (_this.options.accordion && !bypass) {
        $.each(_this.parent.sections, function (i, section) {
          section.close();
        });
      }
      _this._changeState("open", bypass);
    },
    _index: function _index() {
      return $.inArray(this, this.parent.sections);
    },
    _changeState: function _changeState(state, bypass) {

      var _this = this;
      _this.isOpen = state == "open";
      if ($.isFunction(_this.options[state]) && !bypass) {
        _this.options[state].apply(_this.$details);
      } else {
        _this.$details[_this.isOpen ? "show" : "hide"]();
      }

      _this.$summary.toggleClass("open", state !== "close");
      _this.$details.attr("aria-hidden", state === "close");
      _this.$summary.attr("aria-expanded", state === "open");
      _this.$summary.trigger(state === "open" ? "opened" : "closed", _this);
      if (_this.parent.db) {
        _this.parent.db.write(_this._index(), _this.isOpen);
      }
    }
  };

  // Expose in jQuery API
  $.fn.extend({
    collapse: function collapse(options, scan) {
      var nodes = scan ? $("body").find("[data-collapse]") : $(this);
      return nodes.each(function () {
        var settings = scan ? {} : options,
            values = $(this).attr("data-collapse") || "";
        $.each(values.split(" "), function (i, v) {
          if (v) settings[v] = true;
        });
        new Collapse($(this), settings);
      });
    }
  });

  // Expose constructor to
  // global namespace
  exports.jQueryCollapse = Collapse;
  exports.jQueryCollapseSection = Section;

  //jQuery DOM Ready
  $(function () {
    $.fn.collapse(false, true);
  });
})(window.jQuery, window);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery Smooth Scroll - v2.1.2 - 2017-01-19
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2017 Karl Swedberg
 * Licensed MIT
 */

!function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? require("jquery") : jQuery);
}(function (a) {
  var b = "2.1.2",
      c = {},
      d = { exclude: [], excludeWithin: [], offset: 0, direction: "top", delegateSelector: null, scrollElement: null, scrollTarget: null, beforeScroll: function beforeScroll() {}, afterScroll: function afterScroll() {}, easing: "swing", speed: 400, autoCoefficient: 2, preventDefault: !0 },
      e = function e(b) {
    var c = [],
        d = !1,
        e = b.dir && "left" === b.dir ? "scrollLeft" : "scrollTop";return this.each(function () {
      var b = a(this);if (this !== document && this !== window) return !document.scrollingElement || this !== document.documentElement && this !== document.body ? void (b[e]() > 0 ? c.push(this) : (b[e](1), d = b[e]() > 0, d && c.push(this), b[e](0))) : (c.push(document.scrollingElement), !1);
    }), c.length || this.each(function () {
      this === document.documentElement && "smooth" === a(this).css("scrollBehavior") && (c = [this]), c.length || "BODY" !== this.nodeName || (c = [this]);
    }), "first" === b.el && c.length > 1 && (c = [c[0]]), c;
  },
      f = /^([\-\+]=)(\d+)/;a.fn.extend({ scrollable: function scrollable(a) {
      var b = e.call(this, { dir: a });return this.pushStack(b);
    }, firstScrollable: function firstScrollable(a) {
      var b = e.call(this, { el: "first", dir: a });return this.pushStack(b);
    }, smoothScroll: function smoothScroll(b, c) {
      if (b = b || {}, "options" === b) return c ? this.each(function () {
        var b = a(this),
            d = a.extend(b.data("ssOpts") || {}, c);a(this).data("ssOpts", d);
      }) : this.first().data("ssOpts");var d = a.extend({}, a.fn.smoothScroll.defaults, b),
          e = function e(b) {
        var c = function c(a) {
          return a.replace(/(:|\.|\/)/g, "\\$1");
        },
            e = this,
            f = a(this),
            g = a.extend({}, d, f.data("ssOpts") || {}),
            h = d.exclude,
            i = g.excludeWithin,
            j = 0,
            k = 0,
            l = !0,
            m = {},
            n = a.smoothScroll.filterPath(location.pathname),
            o = a.smoothScroll.filterPath(e.pathname),
            p = location.hostname === e.hostname || !e.hostname,
            q = g.scrollTarget || o === n,
            r = c(e.hash);if (r && !a(r).length && (l = !1), g.scrollTarget || p && q && r) {
          for (; l && j < h.length;) {
            f.is(c(h[j++])) && (l = !1);
          }for (; l && k < i.length;) {
            f.closest(i[k++]).length && (l = !1);
          }
        } else l = !1;l && (g.preventDefault && b.preventDefault(), a.extend(m, g, { scrollTarget: g.scrollTarget || r, link: e }), a.smoothScroll(m));
      };return null !== b.delegateSelector ? this.off("click.smoothscroll", b.delegateSelector).on("click.smoothscroll", b.delegateSelector, e) : this.off("click.smoothscroll").on("click.smoothscroll", e), this;
    } });var g = function g(a) {
    var b = { relative: "" },
        c = "string" == typeof a && f.exec(a);return "number" == typeof a ? b.px = a : c && (b.relative = c[1], b.px = parseFloat(c[2]) || 0), b;
  };a.smoothScroll = function (b, d) {
    if ("options" === b && "object" == (typeof d === "undefined" ? "undefined" : _typeof(d))) return a.extend(c, d);var e,
        f,
        h,
        i,
        j = g(b),
        k = {},
        l = 0,
        m = "offset",
        n = "scrollTop",
        o = {},
        p = {};j.px ? e = a.extend({ link: null }, a.fn.smoothScroll.defaults, c) : (e = a.extend({ link: null }, a.fn.smoothScroll.defaults, b || {}, c), e.scrollElement && (m = "position", "static" === e.scrollElement.css("position") && e.scrollElement.css("position", "relative")), d && (j = g(d))), n = "left" === e.direction ? "scrollLeft" : n, e.scrollElement ? (f = e.scrollElement, j.px || /^(?:HTML|BODY)$/.test(f[0].nodeName) || (l = f[n]())) : f = a("html, body").firstScrollable(e.direction), e.beforeScroll.call(f, e), k = j.px ? j : { relative: "", px: a(e.scrollTarget)[m]() && a(e.scrollTarget)[m]()[e.direction] || 0 }, o[n] = k.relative + (k.px + l + e.offset), h = e.speed, "auto" === h && (i = Math.abs(o[n] - f[n]()), h = i / e.autoCoefficient), p = { duration: h, easing: e.easing, complete: function complete() {
        e.afterScroll.call(e.link, e);
      } }, e.step && (p.step = e.step), f.length ? f.stop().animate(o, p) : e.afterScroll.call(e.link, e);
  }, a.smoothScroll.version = b, a.smoothScroll.filterPath = function (a) {
    return a = a || "", a.replace(/^\//, "").replace(/(?:index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "");
  }, a.fn.smoothScroll.defaults = d;
});
'use strict';

/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function () {
  'use strict';

  var keyCounter = 0;
  var allWaypoints = {};

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor');
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor');
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor');
    }

    this.key = 'waypoint-' + keyCounter;
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options);
    this.element = this.options.element;
    this.adapter = new Waypoint.Adapter(this.element);
    this.callback = options.handler;
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical';
    this.enabled = this.options.enabled;
    this.triggerPoint = null;
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    });
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context);

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset];
    }
    this.group.add(this);
    this.context.add(this);
    allWaypoints[this.key] = this;
    keyCounter += 1;
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function (direction) {
    this.group.queueTrigger(this, direction);
  };

  /* Private */
  Waypoint.prototype.trigger = function (args) {
    if (!this.enabled) {
      return;
    }
    if (this.callback) {
      this.callback.apply(this, args);
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function () {
    this.context.remove(this);
    this.group.remove(this);
    delete allWaypoints[this.key];
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function () {
    this.enabled = false;
    return this;
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function () {
    this.context.refresh();
    this.enabled = true;
    return this;
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function () {
    return this.group.next(this);
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function () {
    return this.group.previous(this);
  };

  /* Private */
  Waypoint.invokeAll = function (method) {
    var allWaypointsArray = [];
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey]);
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]();
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function () {
    Waypoint.invokeAll('destroy');
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function () {
    Waypoint.invokeAll('disable');
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function () {
    Waypoint.Context.refreshAll();
    for (var waypointKey in allWaypoints) {
      allWaypoints[waypointKey].enabled = true;
    }
    return this;
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function () {
    Waypoint.Context.refreshAll();
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight;
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function () {
    return document.documentElement.clientWidth;
  };

  Waypoint.adapters = [];

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  };

  Waypoint.offsetAliases = {
    'bottom-in-view': function bottomInView() {
      return this.context.innerHeight() - this.adapter.outerHeight();
    },
    'right-in-view': function rightInView() {
      return this.context.innerWidth() - this.adapter.outerWidth();
    }
  };

  window.Waypoint = Waypoint;
})();(function () {
  'use strict';

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60);
  }

  var keyCounter = 0;
  var contexts = {};
  var Waypoint = window.Waypoint;
  var oldWindowLoad = window.onload;

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element;
    this.Adapter = Waypoint.Adapter;
    this.adapter = new this.Adapter(element);
    this.key = 'waypoint-context-' + keyCounter;
    this.didScroll = false;
    this.didResize = false;
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    };
    this.waypoints = {
      vertical: {},
      horizontal: {}
    };

    element.waypointContextKey = this.key;
    contexts[element.waypointContextKey] = this;
    keyCounter += 1;
    if (!Waypoint.windowContext) {
      Waypoint.windowContext = true;
      Waypoint.windowContext = new Context(window);
    }

    this.createThrottledScrollHandler();
    this.createThrottledResizeHandler();
  }

  /* Private */
  Context.prototype.add = function (waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical';
    this.waypoints[axis][waypoint.key] = waypoint;
    this.refresh();
  };

  /* Private */
  Context.prototype.checkEmpty = function () {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal);
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical);
    var isWindow = this.element == this.element.window;
    if (horizontalEmpty && verticalEmpty && !isWindow) {
      this.adapter.off('.waypoints');
      delete contexts[this.key];
    }
  };

  /* Private */
  Context.prototype.createThrottledResizeHandler = function () {
    var self = this;

    function resizeHandler() {
      self.handleResize();
      self.didResize = false;
    }

    this.adapter.on('resize.waypoints', function () {
      if (!self.didResize) {
        self.didResize = true;
        Waypoint.requestAnimationFrame(resizeHandler);
      }
    });
  };

  /* Private */
  Context.prototype.createThrottledScrollHandler = function () {
    var self = this;
    function scrollHandler() {
      self.handleScroll();
      self.didScroll = false;
    }

    this.adapter.on('scroll.waypoints', function () {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true;
        Waypoint.requestAnimationFrame(scrollHandler);
      }
    });
  };

  /* Private */
  Context.prototype.handleResize = function () {
    Waypoint.Context.refreshAll();
  };

  /* Private */
  Context.prototype.handleScroll = function () {
    var triggeredGroups = {};
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    };

    for (var axisKey in axes) {
      var axis = axes[axisKey];
      var isForward = axis.newScroll > axis.oldScroll;
      var direction = isForward ? axis.forward : axis.backward;

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey];
        if (waypoint.triggerPoint === null) {
          continue;
        }
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint;
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint;
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint;
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint;
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers();
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    };
  };

  /* Private */
  Context.prototype.innerHeight = function () {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportHeight();
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerHeight();
  };

  /* Private */
  Context.prototype.remove = function (waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key];
    this.checkEmpty();
  };

  /* Private */
  Context.prototype.innerWidth = function () {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportWidth();
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerWidth();
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function () {
    var allWaypoints = [];
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey]);
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy();
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function () {
    /*eslint-disable eqeqeq */
    var isWindow = this.element == this.element.window;
    /*eslint-enable eqeqeq */
    var contextOffset = isWindow ? undefined : this.adapter.offset();
    var triggeredGroups = {};
    var axes;

    this.handleScroll();
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    };

    for (var axisKey in axes) {
      var axis = axes[axisKey];
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey];
        var adjustment = waypoint.options.offset;
        var oldTriggerPoint = waypoint.triggerPoint;
        var elementOffset = 0;
        var freshWaypoint = oldTriggerPoint == null;
        var contextModifier, wasBeforeScroll, nowAfterScroll;
        var triggeredBackward, triggeredForward;

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp];
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint);
        } else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment);
          if (waypoint.options.offset.indexOf('%') > -1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100);
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset;
        waypoint.triggerPoint = Math.floor(elementOffset + contextModifier - adjustment);
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll;
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll;
        triggeredBackward = wasBeforeScroll && nowAfterScroll;
        triggeredForward = !wasBeforeScroll && !nowAfterScroll;

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        } else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        } else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        }
      }
    }

    Waypoint.requestAnimationFrame(function () {
      for (var groupKey in triggeredGroups) {
        triggeredGroups[groupKey].flushTriggers();
      }
    });

    return this;
  };

  /* Private */
  Context.findOrCreateByElement = function (element) {
    return Context.findByElement(element) || new Context(element);
  };

  /* Private */
  Context.refreshAll = function () {
    for (var contextId in contexts) {
      contexts[contextId].refresh();
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function (element) {
    return contexts[element.waypointContextKey];
  };

  window.onload = function () {
    if (oldWindowLoad) {
      oldWindowLoad();
    }
    Context.refreshAll();
  };

  Waypoint.requestAnimationFrame = function (callback) {
    var requestFn = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || requestAnimationFrameShim;
    requestFn.call(window, callback);
  };
  Waypoint.Context = Context;
})();(function () {
  'use strict';

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint;
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint;
  }

  var groups = {
    vertical: {},
    horizontal: {}
  };
  var Waypoint = window.Waypoint;

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name;
    this.axis = options.axis;
    this.id = this.name + '-' + this.axis;
    this.waypoints = [];
    this.clearTriggerQueues();
    groups[this.axis][this.name] = this;
  }

  /* Private */
  Group.prototype.add = function (waypoint) {
    this.waypoints.push(waypoint);
  };

  /* Private */
  Group.prototype.clearTriggerQueues = function () {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    };
  };

  /* Private */
  Group.prototype.flushTriggers = function () {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction];
      var reverse = direction === 'up' || direction === 'left';
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint);
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i];
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction]);
        }
      }
    }
    this.clearTriggerQueues();
  };

  /* Private */
  Group.prototype.next = function (waypoint) {
    this.waypoints.sort(byTriggerPoint);
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
    var isLast = index === this.waypoints.length - 1;
    return isLast ? null : this.waypoints[index + 1];
  };

  /* Private */
  Group.prototype.previous = function (waypoint) {
    this.waypoints.sort(byTriggerPoint);
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
    return index ? this.waypoints[index - 1] : null;
  };

  /* Private */
  Group.prototype.queueTrigger = function (waypoint, direction) {
    this.triggerQueues[direction].push(waypoint);
  };

  /* Private */
  Group.prototype.remove = function (waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
    if (index > -1) {
      this.waypoints.splice(index, 1);
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function () {
    return this.waypoints[0];
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function () {
    return this.waypoints[this.waypoints.length - 1];
  };

  /* Private */
  Group.findOrCreate = function (options) {
    return groups[options.axis][options.name] || new Group(options);
  };

  Waypoint.Group = Group;
})();(function () {
  'use strict';

  var $ = window.jQuery;
  var Waypoint = window.Waypoint;

  function JQueryAdapter(element) {
    this.$element = $(element);
  }

  $.each(['innerHeight', 'innerWidth', 'off', 'offset', 'on', 'outerHeight', 'outerWidth', 'scrollLeft', 'scrollTop'], function (i, method) {
    JQueryAdapter.prototype[method] = function () {
      var args = Array.prototype.slice.call(arguments);
      return this.$element[method].apply(this.$element, args);
    };
  });

  $.each(['extend', 'inArray', 'isEmptyObject'], function (i, method) {
    JQueryAdapter[method] = $[method];
  });

  Waypoint.adapters.push({
    name: 'jquery',
    Adapter: JQueryAdapter
  });
  Waypoint.Adapter = JQueryAdapter;
})();(function () {
  'use strict';

  var Waypoint = window.Waypoint;

  function createExtension(framework) {
    return function () {
      var waypoints = [];
      var overrides = arguments[0];

      if (framework.isFunction(arguments[0])) {
        overrides = framework.extend({}, arguments[1]);
        overrides.handler = arguments[0];
      }

      this.each(function () {
        var options = framework.extend({}, overrides, {
          element: this
        });
        if (typeof options.context === 'string') {
          options.context = framework(this).closest(options.context)[0];
        }
        waypoints.push(new Waypoint(options));
      });

      return waypoints;
    };
  }

  if (window.jQuery) {
    window.jQuery.fn.waypoint = createExtension(window.jQuery);
  }
  if (window.Zepto) {
    window.Zepto.fn.waypoint = createExtension(window.Zepto);
  }
})();
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-cssanimations-csstransforms-csstransforms3d-csstransitions-flexbox-flexboxlegacy-touchevents-setclasses !*/
!function (e, n, t) {
  function s(e, n) {
    return (typeof e === "undefined" ? "undefined" : _typeof(e)) === n;
  }function r() {
    var e, n, t, r, o, i, a;for (var f in x) {
      if (x.hasOwnProperty(f)) {
        if (e = [], n = x[f], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {
          e.push(n.options.aliases[t].toLowerCase());
        }for (r = s(n.fn, "function") ? n.fn() : n.fn, o = 0; o < e.length; o++) {
          i = e[o], a = i.split("."), 1 === a.length ? Modernizr[a[0]] = r : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = r), y.push((r ? "" : "no-") + a.join("-"));
        }
      }
    }
  }function o(e) {
    var n = w.className,
        t = Modernizr._config.classPrefix || "";if (S && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var s = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");n = n.replace(s, "$1" + t + "js$2");
    }Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), S ? w.className.baseVal = n : w.className = n);
  }function i() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : S ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
  }function a() {
    var e = n.body;return e || (e = i(S ? "svg" : "body"), e.fake = !0), e;
  }function f(e, t, s, r) {
    var o,
        f,
        l,
        u,
        d = "modernizr",
        p = i("div"),
        c = a();if (parseInt(s, 10)) for (; s--;) {
      l = i("div"), l.id = r ? r[s] : d + (s + 1), p.appendChild(l);
    }return o = i("style"), o.type = "text/css", o.id = "s" + d, (c.fake ? c : p).appendChild(o), c.appendChild(p), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(n.createTextNode(e)), p.id = d, c.fake && (c.style.background = "", c.style.overflow = "hidden", u = w.style.overflow, w.style.overflow = "hidden", w.appendChild(c)), f = t(p, e), c.fake ? (c.parentNode.removeChild(c), w.style.overflow = u, w.offsetHeight) : p.parentNode.removeChild(p), !!f;
  }function l(e, n) {
    return !!~("" + e).indexOf(n);
  }function u(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, n, t) {
      return n + t.toUpperCase();
    }).replace(/^-/, "");
  }function d(e, n) {
    return function () {
      return e.apply(n, arguments);
    };
  }function p(e, n, t) {
    var r;for (var o in e) {
      if (e[o] in n) return t === !1 ? e[o] : (r = n[e[o]], s(r, "function") ? d(r, t || n) : r);
    }return !1;
  }function c(e) {
    return e.replace(/([A-Z])/g, function (e, n) {
      return "-" + n.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }function m(n, s) {
    var r = n.length;if ("CSS" in e && "supports" in e.CSS) {
      for (; r--;) {
        if (e.CSS.supports(c(n[r]), s)) return !0;
      }return !1;
    }if ("CSSSupportsRule" in e) {
      for (var o = []; r--;) {
        o.push("(" + c(n[r]) + ":" + s + ")");
      }return o = o.join(" or "), f("@supports (" + o + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" == getComputedStyle(e, null).position;
      });
    }return t;
  }function h(e, n, r, o) {
    function a() {
      d && (delete N.style, delete N.modElem);
    }if (o = s(o, "undefined") ? !1 : o, !s(r, "undefined")) {
      var f = m(e, r);if (!s(f, "undefined")) return f;
    }for (var d, p, c, h, v, g = ["modernizr", "tspan"]; !N.style;) {
      d = !0, N.modElem = i(g.shift()), N.style = N.modElem.style;
    }for (c = e.length, p = 0; c > p; p++) {
      if (h = e[p], v = N.style[h], l(h, "-") && (h = u(h)), N.style[h] !== t) {
        if (o || s(r, "undefined")) return a(), "pfx" == n ? h : !0;try {
          N.style[h] = r;
        } catch (y) {}if (N.style[h] != v) return a(), "pfx" == n ? h : !0;
      }
    }return a(), !1;
  }function v(e, n, t, r, o) {
    var i = e.charAt(0).toUpperCase() + e.slice(1),
        a = (e + " " + z.join(i + " ") + i).split(" ");return s(n, "string") || s(n, "undefined") ? h(a, n, r, o) : (a = (e + " " + P.join(i + " ") + i).split(" "), p(a, n, t));
  }function g(e, n, s) {
    return v(e, t, t, n, s);
  }var y = [],
      x = [],
      C = { _version: "3.3.1", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, n) {
      var t = this;setTimeout(function () {
        n(t[e]);
      }, 0);
    }, addTest: function addTest(e, n, t) {
      x.push({ name: e, fn: n, options: t });
    }, addAsyncTest: function addAsyncTest(e) {
      x.push({ name: null, fn: e });
    } },
      Modernizr = function Modernizr() {};Modernizr.prototype = C, Modernizr = new Modernizr();var w = n.documentElement,
      S = "svg" === w.nodeName.toLowerCase(),
      b = C._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];C._prefixes = b;var _ = C.testStyles = f;Modernizr.addTest("touchevents", function () {
    var t;if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;else {
      var s = ["@media (", b.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");_(s, function (e) {
        t = 9 === e.offsetTop;
      });
    }return t;
  });var T = "Moz O ms Webkit",
      z = C._config.usePrefixes ? T.split(" ") : [];C._cssomPrefixes = z;var P = C._config.usePrefixes ? T.toLowerCase().split(" ") : [];C._domPrefixes = P;var E = { elem: i("modernizr") };Modernizr._q.push(function () {
    delete E.elem;
  });var N = { style: E.elem.style };Modernizr._q.unshift(function () {
    delete N.style;
  }), C.testAllProps = v, C.testAllProps = g, Modernizr.addTest("cssanimations", g("animationName", "a", !0)), Modernizr.addTest("flexbox", g("flexBasis", "1px", !0)), Modernizr.addTest("flexboxlegacy", g("boxDirection", "reverse", !0)), Modernizr.addTest("csstransforms", function () {
    return -1 === navigator.userAgent.indexOf("Android 2.") && g("transform", "scale(1)", !0);
  }), Modernizr.addTest("csstransitions", g("transition", "all", !0));var j = "CSS" in e && "supports" in e.CSS,
      k = "supportsCSS" in e;Modernizr.addTest("supports", j || k), Modernizr.addTest("csstransforms3d", function () {
    var e = !!g("perspective", "1px", !0),
        n = Modernizr._config.usePrefixes;if (e && (!n || "webkitPerspective" in w.style)) {
      var t,
          s = "#modernizr{width:0;height:0}";Modernizr.supports ? t = "@supports (perspective: 1px)" : (t = "@media (transform-3d)", n && (t += ",(-webkit-transform-3d)")), t += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", _(s + t, function (n) {
        e = 7 === n.offsetWidth && 18 === n.offsetHeight;
      });
    }return e;
  }), r(), o(y), delete C.addTest, delete C.addAsyncTest;for (var A = 0; A < Modernizr._q.length; A++) {
    Modernizr._q[A]();
  }e.Modernizr = Modernizr;
}(window, document);
'use strict';

(function (document, $, undefined) {

	$('body').addClass('js');

	'use strict';

	var progressive = {},
	    subMenuButtonClass = 'sub-menu-toggle';

	progressive.init = function () {
		var toggleButtons = {
			submenu: $('<button />', {
				'class': subMenuButtonClass,
				'aria-expanded': false,
				'aria-pressed': false,
				'role': 'button'
			}).append($('<span />', {
				'class': 'screen-reader-text',
				text: progressive.params.subMenu
			}))
		};
		$('nav .sub-menu').before(toggleButtons.submenu); // add the submenu nav buttons
		$(window).on('resize.progressive', _doResize).triggerHandler('resize.progressive');
		$('.' + subMenuButtonClass).on('click.progressive-subbutton', _submenuToggle);
	};

	// Change Skiplinks and Superfish
	function _doResize() {
		var buttons = $('button[id^=mobile-]').attr('id');
		if (typeof buttons === 'undefined') {
			return;
		}
		_maybeClose(buttons);
	}

	/**
  * action for submenu toggles
  */
	function _submenuToggle() {

		var $this = $(this),
		    others = $this.closest('.menu-item').siblings();
		_toggleAria($this, 'aria-pressed');
		_toggleAria($this, 'aria-expanded');
		$this.toggleClass('activated');
		$this.next('.sub-menu').slideToggle('fast');

		others.find('.' + subMenuButtonClass).removeClass('activated').attr('aria-pressed', 'false');
		others.find('.sub-menu').slideUp('fast');
	}

	function _maybeClose(buttons) {
		if ('none' !== _getDisplayValue(buttons)) {
			return;
		}
		$('.sub-menu-toggle').removeClass('activated').attr('aria-expanded', false).attr('aria-pressed', false);
		$('.sub-menu').attr('style', '');
	}

	/**
  * generic function to get the display value of an element
  * @param  {id} $id ID to check
  * @return {string}     CSS value of display property
  */
	function _getDisplayValue($id) {
		var element = document.getElementById($id),
		    style = window.getComputedStyle(element);
		return style.getPropertyValue('display');
	}

	/**
  * Toggle aria attributes
  * @param  {button} $this     passed through
  * @param  {aria-xx} attribute aria attribute to toggle
  * @return {bool}           from _ariaReturn
  */
	function _toggleAria($this, attribute) {
		$this.attr(attribute, function (index, value) {
			return 'false' === value;
		});
	}

	$(document).ready(function () {

		progressive.params = typeof ProgressiveL10n === 'undefined' ? '' : ProgressiveL10n;

		if (typeof progressive.params !== 'undefined') {
			progressive.init();
		}
	});
})(document, jQuery);
'use strict';

(function ($) {

	'use strict';

	// Cache selectors

	var id,
	    lastId,
	    reSmooth = /^#section-/,
	    menu_items = $("#site-navigation").find('a[href^="/#"]'),

	// scrollItems includes all of the container divs that relate to menu items.
	scrollItems = menu_items.map(function () {
		var href = $(this).attr("href").replace(/^\//, '');
		var item = $(href.replace(reSmooth, ''));
		if (item.length) {
			return item;
		}
	});

	// add link modifier to remove jump
	$('.home .nav-primary a[href^="/#"]').each(function () {
		$(this).attr('href', function () {
			var href = $(this).attr("href").replace(/^\//, '');
			var item = $(href);
			if (item.length) {
				return '/#section-' + href.slice(1);
			}
		});
	});

	// On page load smooth scroll
	/*
 	if (reSmooth.test(location.hash)) {
   // Strip the "#smoothScroll" part off (and put "#" back on the beginning)
   id = '#' + location.hash.replace(reSmooth, '');
   $.smoothScroll({
 		scrollTarget: id
 	});
 }
 */

	// On page smooth scroll menu

	$('.home .nav-primary a[href^="/#"]').on('click', function () {

		var href = $(this).attr("href");
		href = href.replace('/#', '');
		href = href.replace('section-', '');
		//console.log(href);
		var item = $('#' + href);
		if (!item.length) {
			return false;
		}

		$.smoothScroll({
			offset: 0,
			scrollTarget: '#' + href
		});
		return false;
	});

	// ======================================
	// Helper functions
	// ======================================

	// Get section or article by href
	function getRelatedContent(el) {
		return $($(el).attr('href'));
	}
	// Get link by section or article id
	function getRelatedNavigation(el) {
		return $('nav a[href="/#section-' + $(el).attr('id') + '"]');
	}

	// ======================================
	// Waypoints: change site header background, set current link
	// ======================================

	$('.home .section').each(function () {

		var $header = $('.site-header');
		var self = $(this);

		$(this).waypoint({
			handler: function handler(direction) {
				if (direction === 'down') {
					//console.log('triggered going down');
					$header.removeClass().addClass('site-header ' + self.data('active'));
				}

				//console.log(getRelatedNavigation(self));
				getRelatedNavigation(self).parent().toggleClass('current-menu-item', direction === 'down');
			},
			offset: 0
		});

		$(this).waypoint({
			handler: function handler(direction) {
				if (direction === 'up') {
					//console.log('triggered going up');
					$header.removeClass().addClass('site-header ' + self.data('active'));
				}

				getRelatedNavigation(self).parent().toggleClass('current-menu-item', direction === 'up');
			},
			offset: function offset() {
				return -self.height() + 0;
			}
		});
	});

	/*
 // If supported by the browser we can also update the URL
   if (window.history && window.history.pushState) {
     history.pushState("", document.title, id);
   }
 */
})(jQuery);
'use strict';

(function ($) {

	'use strict';

	// Load Foundation

	$(document).foundation();

	// touch events for main menu
	$('.nav-primary li:has(ul)').doubleTapToGo();

	var $all_oembed_videos = $("iframe[src*='youtube'], iframe[src*='vimeo']");

	$all_oembed_videos.each(function () {

		var _this = $(this);

		if (_this.parent('.embed-container').length === 0) {
			_this.wrap('<div class="embed-container"></div>');
		}

		_this.removeAttr('height').removeAttr('width');
	});

	// Open external links in new window (exclue mail and foobox)

	$('a').not('svg a, [href*="mailto:"], [class*="foobox"]').each(function () {
		var isInternalLink = new RegExp('/' + window.location.host + '/');
		if (!isInternalLink.test(this.href)) {
			$(this).attr('target', '_blank');
		}
	});

	// Down arrows

	$('.hero').append('<span class="scroll-down scroll-mouse svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.99 29.33"><path class="a" d="M9.17,29.34H7.83A7.84,7.84,0,0,1,0,21.5V7.84A7.84,7.84,0,0,1,7.83,0H9.16A7.84,7.84,0,0,1,17,7.84V21.5A7.84,7.84,0,0,1,9.17,29.34ZM7.83,1A6.84,6.84,0,0,0,1,7.83V21.5a6.84,6.84,0,0,0,6.83,6.83H9.16A6.84,6.84,0,0,0,16,21.5V7.84A6.84,6.84,0,0,0,9.16,1H7.83Z" transform="translate(0 -0.01)"/><path class="scroller" d="M8.5,11.79a2.78,2.78,0,0,1,2.88,2.88A2.82,2.82,0,0,1,8.5,17.55a2.89,2.89,0,0,1-2.88-2.88A2.85,2.85,0,0,1,8.5,11.79Z" transform="translate(0 -0.01)"/></svg></span>');

	$('.down-arrow').append('<span class="scroll-down scroll-arrow svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.01 9.01"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M12.94,7.35,6.71.09a.28.28,0,0,0-.41,0L.07,7.35a.27.27,0,0,0,0,.39l1.4,1.21A.27.27,0,0,0,1.67,9h0a.27.27,0,0,0,.19-.1L6.5,3.42l4.63,5.49a.27.27,0,0,0,.19.1.28.28,0,0,0,.2-.06l1.4-1.21a.28.28,0,0,0,0-.39Z"/></g></g></svg>');

	$(window).scroll(function () {
		$('.section').each(function () {
			if ($(this).offset().top - $(window).scrollTop() < -150) {
				$(this).find('.scroll-down').stop().fadeTo(100, 0);
			} else {
				$(this).find('.scroll-down').stop().fadeTo('fast', 1);
			}
		});
	});

	// Scroll to next section, scroll to footer on last seciton
	$('.scroll-down').on('click', function () {

		var section = $(this).parent('.section');

		var next_section = section.next('.section');

		if (section.is(':last-child')) {
			next_section = $('.site-footer');
		}

		$.smoothScroll({
			offset: 0,
			scrollTarget: next_section
		});
	});

	// close offcanvas when menu item is clicked
	$('.off-canvas li.menu-item.internal').click(function () {
		$('.off-canvas').foundation('close');
	});
})(jQuery);
"use strict";

(function ($) {

	'use strict';

	// Create mobile links

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

		var countrycodes = "1";
		var delimiters = "-|\\.|—|–|&nbsp;";
		var phonedef = "\\+?(?:(?:(?:" + countrycodes + ")(?:\\s|" + delimiters + ")?)?\\(?[2-9]\\d{2}\\)?(?:\\s|" + delimiters + ")?[2-9]\\d{2}(?:" + delimiters + ")?[0-9a-z]{4})";
		var spechars = new RegExp("([- \(\)\.:]|\\s|" + delimiters + ")", "gi"); //Special characters to be removed from the link
		var phonereg = new RegExp("((^|[^0-9])(href=[\"']tel:)?((?:" + phonedef + ")[\"'][^>]*?>)?(" + phonedef + ")($|[^0-9]))", "gi");

		$(".mobile-click-call").html(ReplacePhoneNumbers($(".mobile-click-call").html()));
	}

	function ReplacePhoneNumbers(oldhtml) {
		//Created by Jon Meck at LunaMetrics.com - Version 1.0
		var newhtml = oldhtml.replace(/href=['"]callto:/gi, 'href="tel:');
		newhtml = newhtml.replace(phonereg, function ($0, $1, $2, $3, $4, $5, $6) {
			if ($3) {
				return $1;
			} else if ($4) {
				return $2 + $4 + $5 + $6;
			} else return $2 + "<a href='tel:" + $5.replace(spechars, "") + "'>" + $5 + "</a>" + $6;
		});
		return newhtml;
	}
})(jQuery);
//# sourceMappingURL=project.js.map
