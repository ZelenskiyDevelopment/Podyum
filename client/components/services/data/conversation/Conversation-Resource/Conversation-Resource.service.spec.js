'use strict';

describe('Service: ConversationResource', function () {

  // load the service's module
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));

  // instantiate service
  var ConversationResource;
  beforeEach(inject(function (_ConversationResource_) {
    ConversationResource = _ConversationResource_;
  }));

  it('should do something', function () {
    expect(!!ConversationResource).toBe(true);
  });

});
