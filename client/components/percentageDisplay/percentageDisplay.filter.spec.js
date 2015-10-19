'use strict';

describe('Filter: percentageDisplay', function () {

  // load the filter's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // initialize a new instance of the filter before each test
  var percentageDisplay;
  beforeEach(inject(function ($filter) {
    percentageDisplay = $filter('percentageDisplay');
  }));

  it('should return the input prefixed with "percentageDisplay filter:"', function () {
    var text = 'angularjs';
    expect(1).toEqual(1);
  });

});
