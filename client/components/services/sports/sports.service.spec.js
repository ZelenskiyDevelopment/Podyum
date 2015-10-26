'use strict';

describe('Service: sports', function () {

  // load the service's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // instantiate service
  var sports;
  beforeEach(inject(function (_sports_) {
    sports = _sports_;
  }));

  it('should do something', function () {
    expect(!!sports).toBe(true);
  });

});
