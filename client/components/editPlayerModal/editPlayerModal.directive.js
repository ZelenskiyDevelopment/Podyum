'use strict';

angular.module('abroadathletesApp')
    .directive('editPlayerModal', function ($mdDialog) {
        return {
            templateUrl: 'components/editPlayerModal/editPlayerModal.html',
            restrict: 'EA',
            scope: {
                player: '=',
                update: '='
            },
            transclude: true,
            controller: function ($scope, Teams) {


            },
            link: function (scope, element, attrs) {
                scope.open = function (ev) {
                    $mdDialog.show({
                        controller: 'editPlayerModalController',
                        resolve: {
                            player: function () {
                                return scope.player;
                            },
                            update: function () {
                                return scope.update;
                            }
                        },
                        templateUrl: 'components/editPlayerModal/modalEdit.html',
                        targetEvent: ev,
                        parent: angular.element(document.body),
                        disableParentScroll: false
                    });

                };
            }
        };
    });
