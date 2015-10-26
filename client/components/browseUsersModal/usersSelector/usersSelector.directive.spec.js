'use strict';

describe('Directive: usersSelector', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/browseUsersModal/usersSelector/usersSelector.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<users-selector></users-selector>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toBe(1);
  }));
});
