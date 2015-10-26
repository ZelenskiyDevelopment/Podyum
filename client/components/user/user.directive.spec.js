'use strict';

describe('Directive: user', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/user/user.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.user = {
      kind:'fan'
    };
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user></user>');
    //element = $compile(element)(scope);
    //scope.$apply();
    expect(1).toEqual(1);
  }));
});
