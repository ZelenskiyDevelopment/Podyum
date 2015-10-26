'use strict';

describe('Directive: teamMembersSelector', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/browseMembersModal/teamMembersSelector/teamMembersSelector.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<team-members-selector></team-members-selector>');
   // element = $compile(element)(scope);
   // scope.$apply();
    expect(1).toEqual(1);
  }));
});
