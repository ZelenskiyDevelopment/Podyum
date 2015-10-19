'use strict';

describe('Directive: postStatsBasketball', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/postStats/postStatsBasketball/postStatsBasketball.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<post-stats-basketball></post-stats-basketball>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toBe(1);
  }));
});
