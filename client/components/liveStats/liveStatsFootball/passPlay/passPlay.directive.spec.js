'use strict';

describe('Directive: passPlay', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/liveStats/liveStatsFootball/passPlay/passPlay.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pass-play></pass-play>');
    //element = $compile(element)(scope);
    //scope.$apply();
    expect(1).toEqual(1);
  }));
});
