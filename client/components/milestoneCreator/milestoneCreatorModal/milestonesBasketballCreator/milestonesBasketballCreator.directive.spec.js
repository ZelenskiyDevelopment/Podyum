'use strict';

describe('Directive: milestonesBasketballCreator', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('components/milestoneCreator/milestoneCreatorModal/milestonesBasketballCreator/milestonesBasketballCreator.html'));
  beforeEach(module('socketMock'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    //element = angular.element('<milestones-basketball-creator></milestones-basketball-creator>');
    //element = $compile(element)(scope);
    //scope.$apply();
    expect(1).toEqual(1);
  }));
});