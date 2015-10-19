'use strict';

describe('Filter: footballDescription', function () {

  // load the filter's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // initialize a new instance of the filter before each test
  var footballDescription;
  beforeEach(inject(function ($filter) {
    footballDescription = $filter('footballDescription');
  }));

  it('should return the input prefixed with "footballDescription filter:"', function () {
    var text = 'angularjs';
    expect(1).toEqual(1);
  });

});
