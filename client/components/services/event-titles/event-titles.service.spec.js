'use strict';

describe('Service: eventTitles', function () {

  // load the service's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // instantiate service
  var eventTitles;
  beforeEach(inject(function (_eventTitles_) {
    eventTitles = _eventTitles_;
  }));

  it('should do something', function () {
    expect(!!eventTitles).toBe(true);
  });

});
