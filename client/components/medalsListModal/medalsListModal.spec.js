'use strict';

describe('Service: medalsListModal', function () {

  // load the service's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // instantiate service
  var medalsListModal;
  beforeEach(inject(function (_medalsListModal_) {
    medalsListModal = _medalsListModal_;
  }));

  it('should do something', function () {
    expect(true).toBe(true);
  });

});
