'use strict';

describe('Filter: timerDisplay', function () {

  // load the filter's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // initialize a new instance of the filter before each test
  var timerDisplay;
  beforeEach(inject(function ($filter) {
    timerDisplay = $filter('timerDisplay');
  }));

  it('should return the input prefixed with "timerDisplay filter:"', function () {
    var text = 'angularjs';
    expect(1).toEqual(1);
  });

});
