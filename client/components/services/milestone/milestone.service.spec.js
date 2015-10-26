'use strict';

describe('Service: Milestone', function () {

  // load the service's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // instantiate service
  var Milestone;
  beforeEach(inject(function (_Milestone_) {
    Milestone = _Milestone_;
  }));

  it('should do something', function () {
    expect(1).toEqual(1);
  });

});
