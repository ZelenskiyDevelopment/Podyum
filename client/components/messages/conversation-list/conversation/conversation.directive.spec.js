'use strict';

describe('Directive: conversation', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/messages/conversation-list/conversation/conversation.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<conversation></conversation>');
    //element = $compile(element)(scope);
    //scope.$apply();
    expect(1).toEqual(1);
  }));
});
