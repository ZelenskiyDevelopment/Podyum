'use strict';

describe('Service: Team', function () {

  // load the service's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // instantiate service
  var Team;
  beforeEach(inject(function (_Team_) {
    Team = _Team_;
  }));

  it('should do something', function () {
    expect(!!Team).toBe(true);
  });

});
