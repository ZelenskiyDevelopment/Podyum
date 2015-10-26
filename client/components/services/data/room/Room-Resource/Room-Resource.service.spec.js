'use strict';

describe('Service: RoomResource', function () {

  // load the service's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // instantiate service
  var RoomResource;
  beforeEach(inject(function (_RoomResource_) {
    RoomResource = _RoomResource_;
  }));

  it('should do something', function () {
    expect(!!RoomResource).toBe(true);
  });

});
