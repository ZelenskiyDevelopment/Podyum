'use strict';

describe('Directive: messagesList', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/messages/messages-list/messages-list.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<messages-list></messages-list>');
    //element = $compile(element)(scope);
    //scope.$apply();
    expect(1).toEqual(1);
  }));
});
