###
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
###

noop = ->

class DateRange
  defaultOptions:
    minDate: new Date(new Date().getFullYear() - 10, 0, 1) # January 10 years in the past
    maxDate: new Date(new Date().getFullYear() + 10, 11, 31) # December 10 years in the future
    onDateRangeSelected: noop # External hook

  version: "0.1.1"

  constructor: (selector, options) ->
    @handleElm selector

    if @elm
      @options = Utils.extend {}, @defaultOptions, options
      @handleTemplate()
      @handleDateJust()
      @handleHooks()
    else
      console.warn "DateRange couldn't initialize #{selector} as it's not in the DOM"

  # You can initialize DateRange with a class/id selector or with an actual DOM element.
  handleElm: (selector) ->
    if typeof selector is "string"
      @elm = document.querySelector selector
    else if typeof selector is "object"
      # Check that object is an actual dom element.
      if selector.nodeName
        @elm = selector

  # ************************************************************
  # Hooks
  #   Subscribe to DateRange hooks and then handle DateRanges own hooks.
  # ************************************************************

  handleHooks: ->
    # firstDateJust hooks
    # ------------------------
    @firstDateJust.options.onDateSelected = (startDate) =>
      endDate = @secondDateJust.activeDay?.dataset.date

      if endDate
        # Atm endDate is a string - need to turn it into a date object
        endDate = new Date endDate
        @options.onDateRangeSelected startDate, endDate

    # secondDateJust hooks
    # ------------------------
    @secondDateJust.options.onDateSelected = (endDate) =>
      startDate = @firstDateJust.activeDay?.dataset.date

      if startDate
        # Atm startDate is a string - need to turn it into a date object
        startDate = new Date startDate
        @options.onDateRangeSelected startDate, endDate

  # ************************************************************
  # Actions
  # ************************************************************

  handleDateJust: ->
    @firstDateJust = new DateJust @firstDateJustElm,
                       dragSelection: no
                       minDate: @options.minDate
                       maxDate: @options.maxDate

    @secondDateJust = new DateJust @secondDateJustElm,
                        dragSelection: no
                        minDate: @options.minDate
                        maxDate: @options.maxDate

    @setExistingDates() if @options.existingDateRange

  setExistingDates: ->
    @firstDateJust.setDate @options.existingDateRange[0]
    @secondDateJust.setDate @options.existingDateRange[1]

  reset: ->
    @firstDateJust.reset()
    @secondDateJust.reset()

  # ************************************************************
  # Templating
  # ************************************************************

  render: (elm, template) ->
    elm.innerHTML = template

  handleTemplate: ->
    @template = """
                <div class="first-dj"></div>
                <div class="second-dj"></div>
                """

    @render @elm, @template

    # Now that DateRange is rendered we can do DOM related things.
    @firstDateJustElm = @elm.querySelector ".first-dj"
    @secondDateJustElm = @elm.querySelector ".second-dj"
    Utils.addClass "dr-container", @elm

window.DateRange = DateRange

Utils =
  extend: (target, objects...) ->
    for object in objects
      target[key] = val for key, val of object

    target

  addClass: (className, elm) ->
    elm.classList.add className
