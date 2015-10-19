'use strict';

describe('Service: recruiting', function () {

  // load the service's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // instantiate service
  var recruiting;
  beforeEach(inject(function (_Recruiting_) {
    recruiting = _Recruiting_;
  }));

  it('should do something', function () {
    expect(!!recruiting).toBe(true);
  });

});
