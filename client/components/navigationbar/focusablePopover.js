angular.module('abroadathletesApp')
  .directive("focusablePopover",
    function ($timeout) {

      var _hide = function (e) {
        var target = e.target;
        while (target != document.body) {
          if (target.hasAttribute('popover-title') || target.hasAttribute('popover-placement')) return;
          target = target.parentNode;
        }
        var popovers = document.querySelectorAll('.popover');
        _.forEach(popovers, function( popover ){
          angular.element(popover).scope().$parent.isOpen = false;
          angular.element(popover).scope().$parent.$apply();
        });
      };

      angular.element("body").on("click", _hide);

      return {
        restrict: "EAC",
        link: function (scope, element, attrs) {
          // Stop propagation when clicking inside popover.
          element.on("click", function (event) {
            event.stopPropagation();
          });

          /*// Hide when clicking outside.
          $timeout(function () {
          }, 0);*/

          // Safe remove.
          /*scope.$on("$destroy", function () {
            angular.element("body").off("click", _hide);
          });*/
        }
      };
    }
  );
