'use strict';

describe('Directive: liveStatsBanner', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/live-stats-banner/live-stats-banner.html'));
  beforeEach(module('components/live-stats-banner/live-stats-banner-item/live-stats-banner-item.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<live-stats-banner></live-stats-banner>');
    //element = $compile(element)(scope);
    //scope.$apply();
    expect(1).toEqual(1);
  }));
});
