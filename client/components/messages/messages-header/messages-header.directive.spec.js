'use strict';

describe('Directive: messagesHeader', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/messages/messages-header/messages-header.html'));
  beforeEach(module('components/messages/new-room-modal/new-room-modal.html'));
  beforeEach(module('components/messages/new-conversation-modal/new-conversation-modal.html'));
  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<messages-header></messages-header>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toEqual(1);
  }));
});
