/**
 * All global and core class objects.
 *
 * @copyright	2010, Blizzard Entertainment, Inc
 * @class		Core
 */

$(function() {
	UserAgent.initialize();
	Page.initialize();
	Input.initialize();
	Explore.initialize();
	Flash.initialize();
	Locale.initialize();
	CharSelect.initialize();
	Core.initialize();
});

var Core = {

	/**
	 * Base context URL for the project.
	 */
	baseUrl: '/',

	/**
	 * The cached string for the browser.
	 */
	browser: null,

	/**
	 * Dynamic load queue.
	 */
	deferredLoadQueue: [],

	/**
	 * Current locale.
	 */
	locale: 'en-us',

	/**
	 * The current project.
	 */
	project: '',

	/**
	 * Path to static content.
	 */
	staticUrl: '/',

	/**
	 * The current host and protocol.
	 */
	host: '',

	/**
	 * Initialize the script.
	 *
	 * @constructor
	 */
	initialize: function() {
		Core.processLoadQueue();
		Core.ui();
		Core.host = location.protocol +'//'+ (location.host || location.hostname);
	},

	/**
	 * Return letter (alphabet) values only within a string.
	 *
	 * @param string
	 * @return string
	 */
	alpha: function(string) {
		return string.replace(/[^a-zA-Z]/gi, '');
	},

	/**
	 * Create a frame within the document.
	 *
	 * @param url
	 * @param width
	 * @param height
	 * @param parent
	 */
	appendFrame: function(url, width, height, parent) {
		if (url === undefined)
			return;

		if (width === undefined)
			width = 1;

		if (height === undefined)
			height = 1;

		if (parent === undefined)
			parent = $('body');

		if (Core.isIE())
			parent.append('<iframe src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" frameborder="0" allowTransparency="true"></iframe>');
		else
			parent.append('<object type="text/html" data="' + url + '" width="' + width + '" height="' + height + '"></object>');
	},

	/**
	 * Fix column headers if multiple lines.
	 *
	 * @param query
	 * @param baseHeight
	 */
	fixTableHeaders: function(query, baseHeight) {
		$(query).each(function() {
			baseHeight = baseHeight || 18;

			var table = $(this);
			var height = baseHeight;

			table.find('.sort-link').each(function() {
				var linkHeight = $(this).height();

				if (linkHeight > height)
					height = linkHeight;
			});

			if (baseHeight > 18)
				table.find('.sort-link, .sort-tab').css('height', height);
		});
	},

	/**
	 * Format a locale to a specific structure.
	 *
	 * @param format
	 * @param divider
	 * @return string
	 */
	formatLocale: function(format, divider) {
		divider = divider || '-';
		format = format || 1;

		switch (format) {
			case 1:
			default:
				return Core.locale.replace('-', divider);
			break;
			case 2:
				var parts = Core.locale.split('-');
				return parts[0] + divider + parts[1].toUpperCase();
			break;
			case 3:
				return Core.locale.toUpperCase().replace('-', divider);
			break;
		}
	},

	/**
	 * Convert a datetime string to a users local time zone and return as a string using the specified format.
	 *
	 * http://www.w3.org/TR/html5/common-microsyntaxes.html#valid-global-date-and-time-string
	 *
	 * @param format
	 * @param datetime (2010-07-22T07:41-07:00)
	 * @return string
	 */
	formatDatetime: function(format, datetime) {
		var localDate;

		if (!datetime) {
			localDate = new Date();
		} else {
			// gecko
			localDate = new Date(datetime);

			// webkit
			if (isNaN(localDate.getTime())) { // 2010-07-22 07:41 GMT-0700
				datetime = datetime.substring(0,10) + ' ' + datetime.substring(11,16) + ':00 GMT' + datetime.substring(16,19) + datetime.substring(20,22);
				localDate = new Date(datetime);
			}

			// trident
			if (isNaN(localDate.getTime())) { // 07-22 07:41 GMT-0700 2010
				datetime = datetime.substring(5,10) + ' ' + datetime.substring(11,16) + ' GMT' + datetime.substring(23,28) + ' ' + datetime.substring(0,4);
				localDate = new Date(datetime);
			}

			if (isNaN(localDate.getTime())) {
				return false;
			}
		}

		if (!format)
			format = 'yyyy-MM-ddThh:mmZ';

		var hr = localDate.getHours(),
			meridiem = 'AM';

		if (hr > 12) {
			hr -= 12;
			meridiem = 'PM'

		} else if (hr === 12) {
			meridiem = 'PM'

		} else if (hr === 0) {
			hr = 12;
		}

		var tz = parseInt(localDate.getTimezoneOffset() / 60 * -1, 10);

		if (tz < 0)
			tz = '-' + Core.zeroFill(Math.abs(tz), 2) + ':00';
		else
			tz = '+' + Core.zeroFill(Math.abs(tz), 2) + ':00';

		format = format.replace('yyyy', localDate.getFullYear());
		format = format.replace('MM', Core.zeroFill(localDate.getMonth() + 1,2));
		format = format.replace('dd', Core.zeroFill(localDate.getDate(),2));
		format = format.replace('HH', Core.zeroFill(localDate.getHours(),2));
		format = format.replace('hh', Core.zeroFill(hr,2));
		format = format.replace('mm', Core.zeroFill(localDate.getMinutes(),2));
		format = format.replace('a', meridiem);
		format = format.replace('Z', tz);

		return format;
	},

	/**
	 * Detect the browser type, based on feature detection and not user agent.
	 *
	 * @return string
	 */
	getBrowser: function() {
		if (Core.browser)
			return Core.browser;

		var s = $.support;

		if (!s.hrefNormalized && !s.tbody && !s.style && !s.opacity) {
			if ((typeof document.body.style.maxHeight != "undefined") || (window.XMLHttpRequest))
				Core.browser = 'ie7';
			else
				Core.browser = 'ie6';
		} else if (s.hrefNormalized && s.tbody && s.style && !s.opacity) {
			Core.browser = 'ie8';
		} else {
			Core.browser = 'other';
		}

		return Core.browser;
	},

	/**
	 * Get the hash from the URL.
	 *
	 * @return string
	 */
	getHash: function() {
		var hash = location.hash || "";

		return hash.substr(1, hash.length);
	},

	/**
	 * Return the language based off locale.
	 *
	 * @return string
	 */
	getLanguage: function() {
		return Core.locale.split('-')[0];
	},

	/**
	 * Return the region based off locale.
	 *
	 * @return string
	 */
	getRegion: function() {
		return Core.locale.split('-')[1];
	},

	/**
	 * Conveniently jump to a page.
	 *
	 * @param url
	 * @param base
	 */
	goTo: function(url, base) {
		window.location.href = (base ? Core.baseUrl : '') + url;
		window.event.returnValue = false;
	},

	/**
	 * Include a JavaScript file via XHR.
	 *
	 * @param url
	 * @param success
	 * @param cache - defaults to true
	 */
	include: function(url, success, cache) {
		$.ajax({
			url: url,
			dataType: 'script',
			success: success,
			cache: cache !== false
		});
	},

	/**
	 * Checks to see if the argument is a function/callback.
	 *
	 * @param callback
	 * @return boolean
	 */
	isCallback: function(callback) {
		return (callback && typeof callback === 'function');
	},

	/**
	 * Is the browser using IE?
	 *
	 * @param version
	 * @return boolean
	 */
	isIE: function(version) {
		var browser = Core.getBrowser();

		if (version)
			return ('ie'+ version == browser);
		else
			return ((browser == 'ie6') || (browser == 'ie7') || (browser == 'ie8'));
	},

	/**
	 * Loads either a JavaScript or CSS file, by default deferring the load until after other
	 * content has loaded. The file type is determined by using the file extension.
	 *
	 * @param path
	 * @param deferred - true by default
	 */
	load: function(path, deferred) {
		deferred = deferred !== false;

		if (Page.loaded || !deferred)
			Core.loadDeferred(path);
		else
			Core.deferredLoadQueue.push(path);
	},

	/**
	 * Determine which type to load.
	 *
	 * @param path
	 */
	loadDeferred: function(path) {
		var queryIndex = path.indexOf("?");
		var extIndex = path.lastIndexOf(".") + 1;
		var ext = path.substring(extIndex, queryIndex == -1 ? path.length : queryIndex);

		switch (ext) {
			case 'js':
				Core.loadDeferredScript(path);
			break;
			case "css":
				Core.loadDeferredStyle(path);
			break;
		}
	},

	/**
	 * Include JS file.
	 *
	 * @param path
	 */
	loadDeferredScript: function(path) {
		$("<script/>", {
			type: "text/javascript",
			src: path
		}).appendTo("head");
	},

	/**
	 * Include CSS file; must be done this way because of IE (of course).
	 *
	 * @param path
	 * @param media
	 */
	loadDeferredStyle: function(path, media) {
		$('head').append('<link rel="stylesheet" href="'+ path +'" type="text/css" media="'+ (media || "all") +'" />');
	},

	/**
	 * Replace {0}, {1}, etc. with the passed arguments.
	 *
	 * @param str
	 * @return string
	 */
	msg: function(str) {
		for (var i = 1, len = arguments.length; i < len; ++i) {
			str = str.replace("{" + (i - 1) + "}", arguments[i]);
		}

		return str;
	},

	/**
	 * This version can handle multiple occurences of the same token, but is slower due to the use of a RegExp. Only use if needed.
	 *
	 * @param str
	 * @return string
	 */
	msgAll: function(str) {
		for (var i = 1, len = arguments.length; i < len; ++i) {
			str = str.replace(new RegExp("\\{" + (i - 1) + "\\}", "g"), arguments[i]);
		}

		return str;
	},

	/**
	 * Return numeric values only within a string.
	 *
	 * @param string
	 * @return int
	 */
	numeric: function(string) {
		string = string.replace(/[^0-9]/gi, '');

		if (!string || isNaN(string)) string = 0;

		return string;
	},

	/**
	 * Open the link in a new window.
	 *
	 * @param node
	 * @return false
	 */
	open: function(node) {
		if (node.href)
			window.open(node.href);

		return false;
	},

	/**
	 * Run on page load!
	 */
	processLoadQueue: function() {
		if (Core.deferredLoadQueue.length > 0) {
			for (var i = 0, path; path = Core.deferredLoadQueue[i]; i++) {
				Core.load(path);
			}
		}
	},

	/**
	 * Trims specific characters off the end of a string.
	 *
	 * @param string
	 * @param c
	 * @return string
	 */
	trimChar: function(string, c) {
		if (string.substr(0, 1) === c)
			string = string.substr(1, (string.length - 1));

		if (string.substr((string.length - 1), string.length) === c)
			string = string.substr(0, (string.length - 1));

		return string;
	},

	/**
	 * Apply global functionality to certain UI elements.
	 *
	 * @param context
	 */
	ui: function(context) {
		context = context || document;

		if (Core.isIE(6)) {
			$('button.ui-button', context).hover(
				function() {
					var self = $(this);

					if ((self.attr('disabled') != 'disabled') || (self.attr('disabled') != false))
						self.addClass('hover');
				},
				function() {
					$(this).removeClass('hover');
				}
			);
		}

		if (Core.project != 'bam') {
			$('button.ui-button', context).click(function(e) {
				var self = $(this);
				var alt = self.attr('data-text');

				if (alt == undefined)
					alt = "";

				if (this.tagName.toLowerCase() == 'button' && alt != "") {
					if (self.attr('type') == 'submit') {
						e.preventDefault();
						e.stopPropagation();

						self.find('span span').html(alt);
						self.removeClass('hover')
							.addClass('processing')
							.attr('disabled', 'disabled');

						// Manually submit
						self.parents('form').submit();
					}
				}

				return true;
			});
		}
	},

	/**
	 * Zero-fills a number to the specified length (works on floats and negatives, too).
	 *
	 * @param number
	 * @param width
	 * @param includeDecimal
	 * @return string
	 */
	zeroFill: function(number, width, includeDecimal) {
		if (includeDecimal === undefined)
			includeDecimal = false;

		var result = parseFloat(number),
			negative = false,
			length = width - result.toString().length,
			i = length - 1;

		if (result < 0) {
			result = Math.abs(result);
			negative = true;
			length++;
			i = length - 1;
		}

		if (width > 0) {
			if (result.toString().indexOf('.') > 0) {
				if (!includeDecimal)
					length += result.toString().split('.')[1].length;

				length++;
				i = length - 1;
			}

			if (i >= 0) {
				do {
					result = '0' + result;
				} while (i--);
			}
		}

		if (negative)
			return '-' + result;

		return result;
	}

};

/**
 * Application related functionality.
 */
var App = {

	/**
	 * Hide the service bar warnings.
	 *
	 * @param target
	 * @param cookie
	 */
	closeWarning: function(target, cookie) {
        $(target).hide();

		if (cookie)
			App.saveCookie(cookie);
	},

	/**
	 * Open and close the breaking news.
	 *
	 * @param lastId
	 */
	breakingNews: function(lastId) {
		var node = $("#breaking-news");
		var news = $("#announcement-warning");

		if (news.is(':visible')) {
			news.hide();
			node.removeClass('opened');
		} else {
			news.show();
			node.addClass('opened');
		}

		if (lastId)
			Cookie.create('serviceBar.breakingNews', lastId);
	},

	/**
	 * Save a cookie.
	 *
	 * @param name
	 */
	saveCookie: function(name) {
		Cookie.create('serviceBar.'+ name, 1, {
			expires: 8760, // 1 year of hours
			path: '/'
		});
	},

	/**
	 * Reset a cookie.
	 *
	 * @param name
	 */
	resetCookie: function(name) {
		Cookie.create('serviceBar.'+ name, 0, {
			expires: 8760, // 1 year of hours
			path: '/'
		});
	},

	/**
	 * Hide service bar elements depending on cookies.
	 */
	serviceBar: function() {
		var browser = Cookie.read('serviceBar.browserWarning');
		var locale = Cookie.read('serviceBar.localeWarning');

		if (browser == 1)
			$('#browser-warning').hide();

		if (locale == 1)
			$('#i18n-warning').hide();
	},

	/**
	 * Dynamically load more than one sidebar module at a time.
	 *
	 * @param modules
	 */
	sidebar: function(modules) {
		if (modules) {
			for (var i = 0; i <= (modules.length - 1); ++i) {
				App.loadModule(modules[i]);
			}
		}
	},

	/**
	 * Load the content of a sidebar module through AJAX.
	 *
	 * @param key
	 */
	loadModule: function(key) {
		var module = $('#sidebar-'+ key);

		if (module.length > 0) {
			$.ajax({
				url: Core.baseUrl +'/sidebar/'+ key,
				type: 'GET',
				dataType: 'html',
				cache: false,
				global: false,
				success: function(data) {
					if (data)
						module.html(data);
					else
						module.remove();
				},
				error: function() {
					module.remove();
				}
			});
		}
	}
};

/**
 * Methods for creating, reading, and deleting cookies.
 */
var Cookie = {

	/**
	 * Cached cookies.
	 */
	cache: {},

	/**
	 * Create a cookie. Can accept a third parameter as a literal object of options.
	 *
	 * @param key
	 * @param value
	 * @param options
	 */
	create: function(key, value, options) {
		options = $.extend({}, options);
		options.expires = options.expires || 1; // 1 hour

		if (typeof options.expires == 'number') {
			var hours = options.expires;
			options.expires = new Date();
			options.expires.setTime(options.expires.getTime() + (hours * 3600000));
		}

		var cookie = [
			encodeURIComponent(key) +'=',
			options.escape ? encodeURIComponent(value) : value,
			options.expires ? '; expires=' + options.expires.toUTCString() : '',
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		];

		document.cookie = cookie.join('');

		if (Cookie.cache) {
			if (options.expires == -1)
				delete Cookie.cache[key];
			else
				Cookie.cache[key] = value;
		}
	},

	/**
	 * Read a cookie.
	 *
	 * @param key
	 * @return string
	 */
	read: function(key) {
		// Use cache when available
		if (Cookie.cache[key])
			return Cookie.cache[key];

		var cache = {};
		var cookies = document.cookie.split(';');

		if (cookies.length > 0) {
			for (var i = 0; i < cookies.length; i++) {
				var parts = cookies[i].split('=');

				if (parts.length >= 2)
					cache[$.trim(parts[0])] = parts[1];
			}
		}

		Cookie.cache = cache;
		return cache[key] || null;
	},

	/**
	 * Delete a cookie.
	 *
	 * @param key
	 */
	erase: function(key) {
		Cookie.create(key, true, {
			expires: -1
		});
	}
};

/**
 * Input field helper. Shows default text on blur and hides on focus.
 */
var Input = {

	/**
	 * Initialize binds for search form.
	 */
	initialize: function() {
		$('#search-form')
			.attr('autocomplete', 'off')
			.submit(function() {
				return Input.submit('#search-field');
			});

		// Ensure alt text is displayed after empty search is submitted.
		Input.bind('#search-field');
	},

	/**
	 * Bind the events to a target.
	 *
	 * @param target
	 */
	bind: function(target) {
		Input.reset(target);

		$(target)
			.focus(function() {
				Input.activate(this);
			})
			.blur(function() {
				Input.reset(this);
			});
	},

	/**
	 * Save the current placeholder to the cache and remove.
	 *
	 * @param node
	 */
	activate: function(node) {
		node = $(node);

		if (node.val() == node.attr('alt'))
			node.val("");

		node.addClass("active");
	},

	/**
	 * Display placeholder if value is empty.
	 *
	 * @param node
	 */
	reset: function(node) {
		node = $(node);

		if (node.val() == "")
			node.removeClass("active").val(node.attr('alt'));
		else if (node.val() != node.attr('alt'))
			node.addClass("active")
	},

	/**
	 * Clear field when submitting.
	 *
	 * @param node
	 */
	submit: function(node) {
		node = $(node);

		if (node.val() == node.attr('alt'))
			node.val("");

		if (node.val().length < 2){
			Overlay.open(Msg.cms.shortQuery)
			return false;
		}

		return true;
	}
};

/**
 * Utility to record window scroll / dimensions.
 */
var Page = {

	/**
	 * Window object.
	 */
	object: null,

	/**
	 * Initialized?
	 */
	loaded: false,

	/**
	 * Window dimensions.
	 */
	dimensions: {
		width: 0,
		height: 0
	},

	/**
	 * Window scroll.
	 */
	scroll: {
		top: 0,
		width: 0
	},

	/**
	 * Initialized and grab window properties.
	 *
	 * @constructor
	 */
	initialize: function() {
		if (Page.loaded)
			return;

		if (!Page.object)
			Page.object = $(window);

		Page.object
			.resize(Page.getDimensions)
			.scroll(Page.getScrollValues);

		Page.getScrollValues();
		Page.getDimensions();
		Page.loaded = true;
	},

	/**
	 * Get window scroll values.
	 */
	getScrollValues: function() {
		Page.scroll.top  = Page.object.scrollTop();
		Page.scroll.left = Page.object.scrollLeft();
	},

	/**
	 * Get window dimensions.
	 */
	getDimensions: function() {
		Page.dimensions.width  = Page.object.width();
		Page.dimensions.height = Page.object.height();
	}
};

/**
 * Explore menu.
 */
var Explore = {

	/**
	 * Enable the explore links.
	 *
	 * @constructor
	 */
	initialize: function() {
		var links = $('a[rel="javascript"]');

		if (links.length) {
			links
				.removeAttr('onclick')
				.removeAttr('onmouseover')
				.removeAttr('title')
				.css('cursor', 'pointer');
		}

		var exploreLink = $('#explore-link');
		var newsLink = $('#breaking-link');

		if (exploreLink.length > 0) {
			exploreLink.unbind().click(function() {
				Toggle.open(this, 'active', '#explore-menu');
				return false;
			});
		}

		if (newsLink.length > 0) {
			newsLink.unbind().click(function() {
				App.breakingNews();
				return false;
			});
		}
	}
};

/*
 * Simple open/hide toggle system.
 */
var Toggle = {

	/**
	 * Node cache.
	 */
	cache: {},

	/**
	 * Custom defined callback function.
	 */
	callback: null,

	/**
	 * Timeout to close the menu automatically.
	 */
	timeout: 800,

	/**
	 * Determines whether or not to persist menu open.
	 */
	keepOpen: false,

	/**
	 * Opens a menu / dropdown element.
	 *
	 * @param triggerNode
	 * @param activeClass
	 * @param targetPath
	 * @param delay
	 */
	open: function(triggerNode, activeClass, targetPath, delay) {
		if (delay)
			Toggle.timeout = delay;

		//keep menu open
		Toggle.keepOpen = true;

		var key = Toggle.key(targetPath);

		//bind events and cache
		if (!Toggle.cache[key]) {
			//bind events and toggle the class
			$(triggerNode)
				.mouseleave(function() {
					Toggle.keepOpen = false;
					Toggle.close(triggerNode, activeClass, targetPath, Toggle.timeout);
				})
				.mouseenter(function() {
					Toggle.keepOpen = true;
					window.clearTimeout(Toggle.cache[key].timer);
				});

			//bind events and toggle display of the target
			$(targetPath)
				.mouseleave(function() {
					Toggle.keepOpen = false;
					Toggle.close(triggerNode, activeClass, targetPath, Toggle.timeout);
				})
				.mouseenter(function() {
					Toggle.keepOpen = true;
					window.clearTimeout(Toggle.cache[key].timer);
				});

			//cache properties
			Toggle.cache[key] = {
				trigger: triggerNode,
				target: targetPath,
				activeClass: activeClass,
				key: key,
				timer: null
			};
		}

		//toggle class/display
		$(triggerNode).toggleClass(activeClass);
		$(targetPath).toggle();

		window.clearTimeout(Toggle.cache[key].timer);
	},

	/**
	 * Close the menu and clear any cached timers.
	 *
	 * @param triggerNode
	 * @param activeClass
	 * @param targetPath
	 * @param delay
	 */
	close: function(triggerNode, activeClass, targetPath, delay) {
		var key = Toggle.key(targetPath);

		window.clearTimeout(Toggle.cache[key].timer);

		Toggle.cache[key].timer = setTimeout(function() {
			if (Toggle.keepOpen)
				return;

			$(targetPath).hide();
			$(triggerNode).removeClass(activeClass);
			Toggle.triggerCallback();
		}, delay);
	},

	/**
	 * Generate the key.
	 *
	 * @param targetPath
	 * @return string
	 */
	key: function(targetPath) {
		return (typeof targetPath == 'string') ? targetPath : '#'+ $(targetPath).attr('id');
	},

	/*
	 * Trigger a callback if defined
	 */
	triggerCallback: function() {
		if (Core.isCallback(Toggle.callback))
			Toggle.callback();
	}
};

/**
 * Creates a full page blackout.
 */
var Blackout = {

	/**
	 * Has the blackout been opened before?
	 */
    initialized: false,

	/**
	 * The DOM element.
	 */
    element: null,

	/**
	 * Create the div to be used.
	 *
	 * @constructor
	 */
    initialize: function() {
        Blackout.element = $('<div/>', { id: 'blackout' });

        $("body").append(Blackout.element);

        Blackout.initialized = true;
    },

    /*
     * Shows the blackout
     *
     * @param callback (optional) - function that gets called after blackout shows
     * @param onClick  (optional) - function binds onclick functionality to blackout
     */
    show: function(callback, onClick) {
        if (!Blackout.initialized)
            Blackout.initialize();

        // Ie fix
        if (Core.isIE()) {
            Blackout.element
                .css("width", Page.dimensions.width)
                .css("height", $(document).height());
        }

        // Show blackout
        Blackout.element.show();

        // Call optional functions
        if (Core.isCallback(callback))
            callback();

        if (Core.isCallback(onClick))
            Blackout.element.click(onClick);
    },

    /*
     * Hides blackout
     *
     * @param callback (optional) - function that gets called after blackout hides
     */
    hide: function(callback) {
		Blackout.element.hide();

        if (Core.isCallback(callback))
            callback();

        Blackout.element.unbind("click");
    }
};

/**
 * Manage the context / character selection menu.
 */
var CharSelect = {

	/**
	 * Initialize the class.
	 *
	 * @constructor
	 */
	initialize: function() {
		$(document).undelegate('a.context-link', 'click', CharSelect.toggle);
		$(document).delegate('a.context-link', 'click', CharSelect.toggle);

		$('div.scrollbar-wrapper').css('overflow', 'hidden');
		$('input.character-filter')
			.blur(function() { Toggle.keepOpen = false; })
			.keyup(CharSelect.filter);

		Input.bind('.character-filter');
	},

	/**
	 * Pin a character to the top.
	 *
	 * @param index
	 * @param link
	 */
	pin: function(index, link) {
		Tooltip.hide();
		$('div.character-list').html("").addClass('loading-chars');

		var switchUrl = Core.baseUrl +'/pref/character';

		$.ajax({
			type: 'POST',
			url: switchUrl,
			data: {
				index: index,
				xstoken: xsToken
			},
			global: false,
			success: function(content) {
				var refreshUrl = switchUrl;

				// Take the user directly to the newly-selected character, don't wait for card update
				if (location.pathname.indexOf('/character/') != -1) {
					if (location.pathname.indexOf('/vault/') != -1)
						location.reload(true);
					else
						CharSelect.redirectTo(link.href);

					return;
				}

				// If homepage or account status, use those pages since they are unique
				if (location.pathname.indexOf('/account-status') >= 0)
					refreshUrl = Core.baseUrl +'/account-status';

				else if (location.pathname == Core.baseUrl +'/')
					refreshUrl = Core.baseUrl +'/';

				// Request new content or replace
				if (refreshUrl != switchUrl)
					CharSelect.pageUpdate(refreshUrl);
				else
					CharSelect.replace(content);
			}
		})
	},

	/**
	 * Replace elements in the current page with fetched elements.
	 *
	 * @param content
	 */
	replace: function(content) {
		var replaceList = $('.ajax-update'),
			pageData = $((typeof content == 'string') ? content : content.documentElement);

		replaceList.each(function() {
			var self = $(this),
				target;

			if (self.attr('id')) {
				target = '#'+ self.attr('id');
			} else {
				target = self.attr('class').replace('ajax-update', '').trim();
				target = '.'+ target.split(' ')[0];
			}

			var clone = pageData.find(target +'.ajax-update').clone();
			self.replaceWith(clone);
		});

		CharSelect.initialize();
		CharSelect.afterPageUpdate();
	},

	/**
	 * Update all the elements on the page after char selection.
	 *
	 * @param refreshUrl
	 * @param fallbackUrl
	 */
	pageUpdate: function(refreshUrl, fallbackUrl) {
		var ck = Date.parse(new Date()),
			refreshUrl = refreshUrl || location.href;

		if (Core.isIE() && refreshUrl == Core.baseUrl +'/') {
			location.href = location.pathname +'?reload='+ ck;
			return;
		}

		refreshUrl = refreshUrl + ((refreshUrl.indexOf('?') > -1) ? '&' : '?') +"cachekill="+ ck;

		$.ajax({
			url: refreshUrl,
			global: false,
			error: function(xhr) {
				if (fallbackUrl) {
					location.href = fallbackUrl;
				} else if (xhr.status == 404 && refreshUrl == null) {
					CharSelect.pageUpdate(Core.baseUrl + "/", fallbackUrl); // Attempt to get data from homepage
				} else {
					location.reload(true);
				}
			},
			success: function(data) {
				CharSelect.replace(data);
			}
		});
	},

	/**
	 * Trigger code after page update.
	 */
	afterPageUpdate: function() {

		// Redirect to the newly-selected character or guild
		var redirectTo;

		if (location.href.indexOf('/character/') != -1) {
			redirectTo = $('#user-plate a.character-name').attr('href');

		} else if (location.href.indexOf('/guild/') != -1) {
			redirectTo = $('#user-plate a.guild-name').attr('href');

			// Deal with guildless characters
			if (!redirectTo) {
				location.href = $('#user-plate a.character-name').attr('href');
				return;
			}
		}

		if (redirectTo)
			CharSelect.redirectTo(redirectTo);
	},

	/**
	 * Redirect to a URL.
	 *
	 * @param url
	 */
	redirectTo: function(url) {
		// Vault-secured pages only need to be refreshed
		if (url.indexOf('/vault/') != -1) {
			location.reload();
			return;
		}

		// Preserve current page
		var page = '';

		if (location.href.match(/\/(character|guild)\/.+?\/.+?\/(.+)$/)) {
			page = RegExp.$2;

			// Ignore pages that aren't always available
			$.each(['pet'], function() {
				if (page.indexOf(this) != -1) {
					page = '';
					return;
				}
			});
		}

		location.href = url + page;
	},

	/**
	 * Open and close the context menu.
	 *
	 * @param e
	 */
	toggle: function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		Toggle.open(e.currentTarget, "context-open", $(e.currentTarget).siblings('.ui-context'));
		return false;
	},

	/**
	 * Close the context menu.
	 *
	 * @param node
	 * @return boolean
	 */
	close: function(node) {
		$(node)
			.parents('.ui-context').hide()
			.siblings('.context-link').removeClass('context-open');

		return false;
	},

	/**
	 * Swipe between the char select panes.
	 *
	 * @param direction
	 * @param target
	 */
	swipe: function(direction, target) {
		var parent = $(target).parents('.chars-pane'),
			inDirection = (direction == 'in') ? 'left' : 'right',
			outDirection = (direction == 'in') ? 'right' : 'left';

		parent.hide('slide', { direction: inDirection }, 150, function() {
			parent.siblings('.chars-pane').show('slide', { direction: outDirection }, 150, function() {
				var scroll = $(this).find('.scrollbar-wrapper');

				if (scroll.length > 0)
					scroll.tinyscrollbar();
			});
		});
	},

	/**
	 * Filter down the character list.
	 *
	 * @param e
	 */
	filter: function(e) {
		Toggle.keepOpen = true;

		var target = $(e.srcElement || e.currentTarget),
			filterVal = target.val().toLowerCase(),
			filterTable = target.parents('.chars-pane').find('.overview');

		if (e.keyCode == KeyCode.enter)
			return;

		if (e.keyCode == KeyCode.esc)
			target.val('');

		if (target.val().length < 1) {
			filterTable.children('a').removeClass('filtered');
		} else {
			filterTable.children('a').each(
				function() {
				 	$(this)[($(this).text().toLowerCase().indexOf(filterVal) > -1) ? "removeClass" : "addClass"]('filtered');
				}
			);

			var allHidden = filterTable.children('a.filtered').length >= filterTable.children('a').length;
			filterTable.children('.no-results')[(allHidden) ? "show" : "hide"]();
		}

		var scroll = target.parents('.chars-pane:first').find('.scrollbar-wrapper');

		if (scroll.length > 0)
			scroll.tinyscrollbar();
	}
};

/**
 * Variables and functions for flash
 */
var Flash = {

    /**
     * Video player for this project
     */
    videoPlayer: '',

    /**
     * The flash base of the videos for this project
     */
    videoBase:   '',

    /**
     * Rating image based on locale
     */
    ratingImage: '',

    /**
     * Express install location
     */
    expressInstall: '/common/static/flash/expressInstall.swf',

    /**
     * Store values populated after load
     */
    initialize: function() {
         //set flash base and rating image
         Flash.defaultVideoParams.base          = Flash.videoBase;
         Flash.defaultVideoFlashVars.ratingpath = Flash.ratingImage;
    },

    /**
     * Default video params for the video player
     */
    defaultVideoParams: {
         allowFullScreen:   "true",
         bgcolor:           "#000000",
         allowScriptAccess: "always",
         wmode:             "opaque",
         menu:              "false"
    },

    /**
     * Default flash vars for videos
     */
    defaultVideoFlashVars: {
        ratingfadetime: "2",
        ratingshowtime: "1"
    }
};

/**
 * Helper functions for switching language / region.
 */
var Locale = {

    /**
     * Path to the data source.
     */
    dataPath: 'data/i18n.frag',

	/**
	 * Initialize and bind "open menu" links.
	 *
	 * @constructor
	 */
	initialize: function() {
		var path = location.pathname.replace(Core.baseUrl, "");
			path = path + (location.search || '?');

		$('#change-language, #service .service-language a').click(function() {
			return Locale.openMenu('#change-language', encodeURIComponent(path));
		});
	},

    /**

     * Open up the language selection menu at the target location.
     *
     * @param toggler
     * @param path
     * @param contextPath
     */
    openMenu: function(toggler, path, contextPath) {
        var node = $('#international');
        toggler = $(toggler);
        path = path || '';

        if (node.is(':visible')) {
            node.slideUp();
            toggler.toggleClass('open');

        } else {
            if (node.html() != "") {
                Locale.display();
                toggler.toggleClass('open');
            } else {
                $.ajax({
                    url: Core.baseUrl +'/'+ Locale.dataPath +'?path='+ path,
                    dataType: 'html',
                    success: function(data, status) {
                        if (data) {
                            node.replaceWith(data);
                            toggler.toggleClass('open');
                            Locale.display();
                        }
                    }
                });
            }
        }

        return false;
    },

    /**
     * Track language events.
	 *
	 * @param eventAction
	 * @param eventLabel
     */
	trackEvent: function(eventAction, eventLabel) {
		try {
			_gaq.push(['_trackEvent', 'Battle.net Language Change Event', eventAction, eventLabel]);
		} catch(e) { }
	},

	/**
	 * Display the international menu.
	 */
	display: function() {
		var node = $('#international');
		node.slideDown('fast', function() {
			$(this).css('display', 'block');
		});

		// Opera doesn't animate on scroll down
		if (!$.browser.opera) {
			$('html, body').animate({
				scrollTop: node.offset().top
			}, 1000);
		}
	}
};

/**
 * Pop up toasts at the bottom left of the browser, or at a certain location.
 */
var Toast = {

	/**
	 * DOM object.
	 */
	container: null,

	/**
	 * Has the class been initialized?
	 */
	initialized: false,

	/**
	 * Max toasts to display.
	 */
	max: 5,

	/**
	 * Default options.
	 */
	options: {
		timer: 15000,
		autoClose: true,
		onClick: null
	},

	/**
	 * Build the container.
	 *
	 * @constructor
	 */
	initialize: function() {
		Toast.container = $('<div/>')
			.attr('id', 'toast-container')
			.show()
			.appendTo('body');

		Toast.initialized = true;
	},

	/**
	 * Create the toast element.
	 *
	 * @param content
	 * @return object
	 */
	create: function(content) {
		var toast = $('<div/>')
			.addClass('ui-toast')
			.hide()
			.appendTo(Toast.container);

		$('<div/>').addClass('toast-arrow').appendTo(toast);
		$('<div/>').addClass('toast-top').appendTo(toast);
		$('<div/>').addClass('toast-content').appendTo(toast).html(content);
		$('<div/>').addClass('toast-bot').appendTo(toast);

		$('<a/>')
			.addClass('toast-close')
			.attr('href', 'javascript:;')
			.appendTo(toast)
			.click(function(e) {
				e.preventDefault();
				e.stopPropagation();

				$(this).parent('.ui-toast').fadeOut('normal', function() {
					$(this).remove();
				});
			});

		return toast;
	},

	/**
	 * Pop up a toast.
	 *
	 * @param content
	 * @param options	timer, autoClose, onClick
	 */
	show: function(content, options) {
		if (!Toast.initialized)
			Toast.initialize();

		Toast.truncate();

		var toast = Toast.create(content);

		options = $.extend({}, Toast.options, options);

		if (options.autoClose) {
			window.setTimeout(function() {
				toast.fadeOut('normal', function() {
				   toast.remove();
			   });
			}, options.timer);

		} else {
			toast.click(function() {
			   toast.fadeOut('normal', function() {
				   toast.remove();
			   });
			}).css('cursor', 'pointer');
		}

		if (Core.isCallback(options.onClick))
			toast.click(options.onClick).css('cursor', 'pointer');

		toast.fadeIn();
	},

	/**
	 * Truncate toasts if it exceeds the max limit.
	 */
	truncate: function() {
		var total = Toast.container.find('.ui-toast');

		if (total.length > Toast.max)
			Toast.container.find('.ui-toast:lt('+ Math.round(total.length - Toast.max) +')').fadeOut();
	}
};

/**
 * Mappings of keyboard key codes for all supported regions.
 *
 * @link http://unixpapa.com/js/key.html
 */
var KeyCode = {

	/**
	 * Convenience codes.
	 */
	backspace: 8,
	enter: 13,
	esc: 27,
	space: 32,
	tab: 9,
	arrowLeft: 37,
	arrowUp: 38,
	arrowRight: 39,
	arrowDown: 40,

	/**
	 * A map of all key codes.
	 *
	 * Supported: en, es, de, ru, ko (no changes), fr
	 */
	map: {
		global: {
			// 0-9 numbers (48-57) and numpad numbers (96-105)
			numbers: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105],

			// A-Z letters
			letters: [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],

			// Backspace, tab, enter, shift, ctrl, alt, caps, esc, num, space pup, pdown, end, home, ins, del
			controls: [8, 9, 13, 16, 17, 18, 20, 27, 33, 32, 34, 35, 36, 45, 46, 144],

			// Function (F keys)
			functions: [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],

			// Left, right, up, down, arrows
			arrows: [37, 38, 39, 40],

			// Windows, Mac specific buttons
			os: [17, 91, 92, 93, 219, 224]
		},
		de: {
			letters: [59, 192, 219, 222]
		},
		es: {
			letters: [59, 192]
		},
		ru: {
			letters: [59, 188, 190, 192, 219, 221, 222]
		},
		fr: {
			letters: [191]
		}
	},

	/**
	 * Get all the arrows codes.
	 *
	 * @param lang
	 * @return array
	 */
	arrows: function(lang) {
		return KeyCode.get('arrows', lang);
	},

	/**
	 * Get all the control codes.
	 *
	 * @param lang
	 * @return array
	 */
	controls: function(lang) {
		return KeyCode.get('controls', lang);
	},

	/**
	 * Get all the functions codes.
	 *
	 * @param lang
	 * @return array
	 */
	functions: function(lang) {
		return KeyCode.get('functions', lang);
	},

	/**
	 * Return a key code map.
	 *
	 * @param type
	 * @param lang
	 * @return mixed
	 */
	get: function(type, lang) {
		var map = [],
			types = [],
			lang = lang || Core.getLanguage();

		if (typeof type == 'string')
			types = [type];
		else
			types = type;

		for (var i = 0, l = types.length; i < l; ++i) {
			var t = types[i];

			if (!KeyCode.map.global[t])
				continue;

			map = map.concat(KeyCode.map.global[t]);

			if (KeyCode.map[lang] && KeyCode.map[lang][t])
				map = map.concat(KeyCode.map[lang][t]);
		}

		return map;
	},

	/**
	 * Validates an input to only accept letters and controls.
	 *
	 * @param code
	 * @param lang
	 * @return bool
	 */
	isAlpha: function(code, lang) {
		return ($.inArray(code, KeyCode.get(['letters', 'controls'], lang)) >= 0);
	},

	/**
	 * Validates an input to only accept letters, numbers and controls.
	 *
	 * @param code
	 * @param lang
	 * @return bool
	 */
	isAlnum: function(code, lang) {
		return ($.inArray(code, KeyCode.get(['letters', 'numbers', 'controls'], lang)) >= 0);
	},

	/**
	 * Validates an input to only accept numbers and controls.
	 *
	 * @param code
	 * @param lang
	 * @return bool
	 */
	isNumeric: function(code, lang) {
		return ($.inArray(code, KeyCode.get(['numbers', 'controls'], lang)) >= 0);
	},

	/**
	 * Get all the letter codes.
	 *
	 * @param lang
	 * @return array
	 */
	letters: function(lang) {
		return KeyCode.get('letters', lang);
	},

	/**
	 * Get all the number codes.
	 *
	 * @param lang
	 * @return array
	 */
	numbers: function(lang) {
		return KeyCode.get('numbers', lang);
	}

};

var BnetAds = {

	/**
	 * Load an ad from the marketing API.
	 *
	 * @param target
	 * @param size
	 */
	init: function(target, size){
		$.ajax({
			url: '/marketing/',
			data: {
				showText: true,
				locale: Core.formatLocale(2, '_'),
				size: size
			},
			dataType: 'html',
			success: function(data) {
				var dataBody = data.substring(data.indexOf('<body>'), data.indexOf('</body>')+7);

				$(target).find('.sidebar-content').html($(dataBody).html()).removeClass('loading');
			},
			error: function() {
				$(target).remove();
			},
			cache: false,
			global: false
		});
	},

	trackEvent: function (id,title,ref,clickEvent){
		if (typeof _gaq != "undefined") {
			ref = (ref)?ref+' - ':'';
			var pushEvent = [
				'_trackEvent',
				'Battle.net Ad Service',
				(clickEvent)?'Ad Click-Throughs':'Ad Impressions',
				'Ad '+ id +' - '+ encodeURIComponent(title.replace(' ','_')) +' - '+ ref + Core.locale
			]
			_gaq.push(pushEvent);
		}
	}
};

/**
 * Determines the browser and version based off the user agent.
 */
var UserAgent = {

	/**
	 * User agent header.
	 */
	header: navigator.userAgent.toLowerCase(),

	/**
	 * The current browser.
	 */
	browser: 'other',

	/**
	 * The current version, single number.
	 */
	version: null,

	/**
	 * Extracte the browser and version.
	 *
	 * @constructor
	 */
	initialize: function() {
		var userAgent = UserAgent.header,
			version,
			browser;

		// Browser
		if (userAgent.indexOf('firefox') != -1)
			browser = 'ff';

		else if (userAgent.indexOf('msie') != -1)
			browser = 'ie';

		else if (userAgent.indexOf('chrome') != -1)
			browser = 'chrome';

		else if (userAgent.indexOf('opera') != -1)
			browser = 'opera';

		else if (userAgent.indexOf('safari') != -1)
			browser = 'safari';

		// Version
		if (browser == 'ff')
			version = /firefox\/([-.0-9]+)/.exec(userAgent);

		else if (browser == 'ie')
			version = /msie ([-.0-9]+)/.exec(userAgent);

		else if (browser == 'chrome')
			version = /chrome\/([-.0-9]+)/.exec(userAgent);

		else if (browser == 'opera')
			version = /opera\/([-.0-9]+)/.exec(userAgent);

		else if (browser == 'safari')
			version = /safari\/([-.0-9]+)/.exec(userAgent);

		UserAgent.browser = browser;
		UserAgent.version = version[1].substring(0, 1);

		var className = browser;

		if (UserAgent.version)
			className += ' '+ browser + UserAgent.version;

		if (browser == 'ie' && (UserAgent.version == 6 || UserAgent.version == 7))
			className += ' ie67';

		$('html').addClass(className);
	}
};

/**
 * Prototype overwrites.
 */
String.prototype.trim = function() {
	return $.trim(this);
};

/**
 * Setup ajax calls.
 */
$.ajaxSetup({
	error: function(xhr) {
		if (xhr.readyState != 4)
			return false;

		if (xhr.getResponseHeader("X-App") == "login") {
			location.reload(true);
			return false;
		}

		if (xhr.status) {
			switch (xhr.status) {
				case 301:
				case 302:
				case 307:
				case 403:
				case 404:
				case 500:
				case 503:
					//location.reload(true);
					return false;
				break;
			}
		}

		return true;
	}
});