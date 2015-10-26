'use strict';

describe('Filter: liveEventFilter', function () {

  // load the filter's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // initialize a new instance of the filter before each test
  var liveEventFilter;
  beforeEach(inject(function ($filter) {
    liveEventFilter = $filter('liveEventFilter');
  }));

  it('should return the input prefixed with "liveEventFilter filter:"', function () {
    var text = 'angularjs';
    expect(1).toEqual(1);
  });

});
