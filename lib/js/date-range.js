
/*
The MIT License (MIT)

Copyright (c) 2016 Callum Hart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

(function() {
  var DateRange, Utils, noop,
    slice = [].slice;

  noop = function() {};

  DateRange = (function() {
    DateRange.prototype.defaultOptions = {
      minDate: new Date(new Date().getFullYear() - 10, 0, 1),
      maxDate: new Date(new Date().getFullYear() + 10, 11, 31),
      onDateRangeSelected: noop
    };

    DateRange.prototype.version = "0.1.1";

    function DateRange(selector, options) {
      if (typeof DateJust !== "undefined" && DateJust !== null) {
        this.handleElm(selector);
        if (this.elm) {
          this.options = Utils.extend({}, this.defaultOptions, options);
          this.handleTemplate();
          this.handleDateJust();
          this.handleHooks();
        } else {
          console.warn("DateRange couldn't initialize " + selector + " as it's not in the DOM");
        }
      } else {
        console.error("DateRange couldn't initialize because the dependency DateJust is missing. See https://github.com/callum-hart/DateRange.js#dependencies for more info.");
      }
    }

    DateRange.prototype.handleElm = function(selector) {
      if (typeof selector === "string") {
        return this.elm = document.querySelector(selector);
      } else if (typeof selector === "object") {
        if (selector.nodeName) {
          return this.elm = selector;
        }
      }
    };

    DateRange.prototype.handleHooks = function() {
      this.firstDateJust.options.onDateSelected = (function(_this) {
        return function(startDate) {
          var endDate, ref;
          endDate = (ref = _this.secondDateJust.activeDay) != null ? ref.dataset.date : void 0;
          if (endDate) {
            endDate = new Date(endDate);
            return _this.options.onDateRangeSelected(startDate, endDate);
          }
        };
      })(this);
      return this.secondDateJust.options.onDateSelected = (function(_this) {
        return function(endDate) {
          var ref, startDate;
          startDate = (ref = _this.firstDateJust.activeDay) != null ? ref.dataset.date : void 0;
          if (startDate) {
            startDate = new Date(startDate);
            return _this.options.onDateRangeSelected(startDate, endDate);
          }
        };
      })(this);
    };

    DateRange.prototype.handleDateJust = function() {
      this.firstDateJust = new DateJust(this.firstDateJustElm, {
        dragSelection: false,
        minDate: this.options.minDate,
        maxDate: this.options.maxDate
      });
      this.secondDateJust = new DateJust(this.secondDateJustElm, {
        dragSelection: false,
        minDate: this.options.minDate,
        maxDate: this.options.maxDate
      });
      if (this.options.existingDateRange) {
        return this.setExistingDates();
      }
    };

    DateRange.prototype.setExistingDates = function() {
      this.firstDateJust.setDate(this.options.existingDateRange[0]);
      return this.secondDateJust.setDate(this.options.existingDateRange[1]);
    };

    DateRange.prototype.reset = function() {
      this.firstDateJust.reset();
      return this.secondDateJust.reset();
    };

    DateRange.prototype.render = function(elm, template) {
      return elm.innerHTML = template;
    };

    DateRange.prototype.handleTemplate = function() {
      this.template = "<div class=\"first-dj\"></div>\n<div class=\"second-dj\"></div>";
      this.render(this.elm, this.template);
      this.firstDateJustElm = this.elm.querySelector(".first-dj");
      this.secondDateJustElm = this.elm.querySelector(".second-dj");
      return Utils.addClass("dr-container", this.elm);
    };

    return DateRange;

  })();

  window.DateRange = DateRange;

  Utils = {
    extend: function() {
      var i, key, len, object, objects, target, val;
      target = arguments[0], objects = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      for (i = 0, len = objects.length; i < len; i++) {
        object = objects[i];
        for (key in object) {
          val = object[key];
          target[key] = val;
        }
      }
      return target;
    },
    addClass: function(className, elm) {
      return elm.classList.add(className);
    }
  };

}).call(this);
