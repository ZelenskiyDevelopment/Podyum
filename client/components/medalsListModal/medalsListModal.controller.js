/**
 * Created by mariusz on 20.09.15.
 */
angular.module('abroadathletesApp').controller('medalListModalCtrl', medalListModalCtrl);

medalListModalCtrl.$inject = ['$scope'];

function medalListModalCtrl($scope){

    $scope.closeBothModals = function(){
        this.$dismiss();
        $scope.galleryModal.$dismiss();
    }
}