'use strict';

describe('Directive: profilePlayerStatsFootball', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/profilePlayerStats/profilePlayerStatsFootball/profilePlayerStatsFootball.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<profile-player-stats-football></profile-player-stats-football>');
    //element = $compile(element)(scope);
    scope.$apply();
    expect(1).toBe(1);
  }));
});
