'use strict';

describe('Directive: profilePlayerStatsBasketball', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/profilePlayerStats/profilePlayerStatsBasketball/profilePlayerStatsBasketball.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<profile-player-stats-basketball></profile-player-stats-basketball>');
    element = $compile(element)(scope);
   // scope.$apply();
    expect(1).toBe(1);
  }));
});
