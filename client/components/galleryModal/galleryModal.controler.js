/**
 * Created by mariusz on 14.09.15.
 */
angular.module('abroadathletesApp').controller('galleryModal', galleryModal);

galleryModal.$inject = ['$scope', 'photo', 'Auth', 'medalsListModal', 'Comment'];

function galleryModal($scope, photo, Auth, medalsListModal, Comment) {

    $scope.currentUser = Auth.getCurrentUser();
    $scope._Index = $scope.index;
    $scope.glued = true;
    refreshCurrentPhotoData();
    $scope.deleteComment = function(comment){
      Comment.delete({id: comment._id});
      _.remove($scope.photos[$scope._Index].comments, function(comm) { return comm._id === comment._id; });
    };
    $scope.canAddMedal = function(){
        return !(_.includes(_.map($scope.photos[$scope._Index].medals, '_id'), $scope.currentUser._id));
    };
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
        refreshCurrentPhotoData();
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
        refreshCurrentPhotoData();
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };

    $scope.awardWithMedal = function(){
        photo.addMedal({
            id: $scope.photos[$scope._Index]._id
        },{
            medal: Auth.getCurrentUser()._id
        }).$promise.then(function(response){
                $scope.photos[$scope._Index].medals = response;
            })
    };

    $scope.showPeopleWhoAwarded = function(){
        medalsListModal.open($scope.photos[$scope._Index].medals, this);
    };

    function refreshCurrentPhotoData(){
        photo.get({
            id: $scope.photos[$scope._Index]._id
        }).$promise.then(function(photo){
                $scope.photos[$scope._Index] = photo;
        });
    }

}