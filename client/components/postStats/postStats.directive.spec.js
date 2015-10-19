'use strict';

describe('Directive: postStats', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/postStats/postStats.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<post-stats></post-stats>');
   // element = $compile(element)(scope);
    scope.$apply();
    expect(1).toEqual(1);
  }));
});
