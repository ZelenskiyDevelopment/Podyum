'use strict';

angular.module('abroadathletesApp')
    .controller('AddQuestionCtrl', function ($scope) {

        $scope.user = {
            question: '',
            answers: [{text: ''},{text: ''},{text: ''}]
        };

        $scope.counts = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

        $scope.addAnswer = addAnswer;

        function addAnswer() {
            $scope.user.answers.push({text: '', removed: true});
        }

        $scope.removeAnswer = removeAnswer;

        function removeAnswer($index, e) {
            e.preventDefault();
            $scope.user.answers.splice($index, 1);
        }

        $scope.clearFieldQuestion = clearFieldQuestion;

        function clearFieldQuestion(e) {
            e.preventDefault();
            $scope.user.question = null;
        }

        $scope.clearFieldAnswer = clearFieldAnswer;

        function clearFieldAnswer(e) {
            e.preventDefault();
            e.stopPropagation();
            angular.forEach($scope.user.answers, function() {
                $scope.user.answer = null;
            })
        }
    })
    .filter('filledAnswers', function () {
        return function (answers) {
            return answers.filter(function (answer) {
                return answer.text;
            });
        }
    });
