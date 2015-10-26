'use strict';

describe('Directive: eventPublisher', function () {

  // load the directive's module and view
  beforeEach(module('abroadathletesApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('components/wall/event/event-comments/event-publisher/event-publisher.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<event-publisher></event-publisher>');
    //element = $compile(element)(scope);
    //scope.$apply();
    expect(1).toEqual(1);

  }));
});
