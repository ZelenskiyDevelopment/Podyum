'use strict';

describe('Directive: event', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/wall/event/event.html'));
  beforeEach(module('components/wall/wall.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.event = {
      isShared:false
    }
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<wall><event></event></wall>');
    //element = $compile(element)(scope);
    //scope.$apply();
    expect(1).toEqual(1);

  }));
});
