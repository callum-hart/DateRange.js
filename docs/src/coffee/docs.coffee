# Example One

exampleOne = new DateRange "#example-one",
  onDateRangeSelected: (startDate, endDate) ->
    console.log "#{startDate} – #{endDate}"

# Example Two

exampleTwo = new DateRange "#example-two",
  minDate: new Date(2015, 0, 1)
  maxDate: new Date(2015, 11, 31)
  existingDateRange: [new Date(2015, 10, 5), new Date(2015, 11, 22)]
  onDateRangeSelected: (startDate, endDate) ->
    console.log "#{startDate} – #{endDate}"