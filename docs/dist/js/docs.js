(function() {
  var exampleOne, exampleTwo;

  exampleOne = new DateRange("#example-one", {
    onDateRangeSelected: function(startDate, endDate) {
      return console.log(startDate + " – " + endDate);
    }
  });

  exampleTwo = new DateRange("#example-two", {
    minDate: new Date(2015, 0, 1),
    maxDate: new Date(2015, 11, 31),
    existingDateRange: [new Date(2015, 10, 5), new Date(2015, 11, 22)],
    onDateRangeSelected: function(startDate, endDate) {
      return console.log(startDate + " – " + endDate);
    }
  });

}).call(this);
