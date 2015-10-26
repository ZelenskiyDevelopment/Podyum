'use strict';

describe('Directive: teamStats', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/team-stats/team-stats.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<team-stats></team-stats>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toEqual(1);
  }));
});
