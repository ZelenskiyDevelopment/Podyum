'use strict';

angular.module('abroadathletesApp')
    .directive('resizeTextarea', function() {
        return function(scope, element) {
            var offset = element.context.offsetHeight - element.context.clientHeight;

            var resizeTextarea = function(el) {
               el.css('height', 'auto').css('height', el.context.scrollHeight + offset);
            };

            element.on('keyup input', function() {

                resizeTextarea(element);

            });

        };
    });