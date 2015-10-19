angular.module('abroadathletesApp')
  .directive("focusablePopover",
    function ($timeout) {
      return {
        restrict: "EAC",
        link: function (scope, element, attrs) {
          var _hide = function () {
            var popovers = document.querySelectorAll('.popover');
            _.forEach(popovers, function( popover ){
              angular.element(popover).scope().$parent.isOpen = false;
              angular.element(popover).scope().$parent.$apply();
              angular.element( popover ).remove();
            });
          };

          // Stop propagation when clicking inside popover.
          element.on("click", function (event) {
            event.stopPropagation();
          });

          // Hide when clicking outside.
          $timeout(function () {

            angular.element("body").one("click", _hide);
          }, 0);

          // Safe remove.
          scope.$on("$destroy", function () {
            angular.element("body").off("click", _hide);
          });
        }
      };
    }
  );
