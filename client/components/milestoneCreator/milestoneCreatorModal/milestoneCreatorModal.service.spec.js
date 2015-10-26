'use strict';

describe('Service: milestoneCreatorModal', function () {

  // load the service's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  // instantiate service
  var milestoneCreatorModal;
  beforeEach(inject(function (_milestoneCreatorModal_) {
    milestoneCreatorModal = _milestoneCreatorModal_;
  }));

  it('should do something', function () {
    expect(1).toEqual(1);
  });

});
