'use strict';

angular.module('abroadathletesApp')
    .controller('CreatorPhotoCtrl', function ($scope, Upload, $rootScope) {

        $scope.myImage = null;
        $scope.myCroppedImage = null;

        var handleFileSelect=function(evt) {
            var file=evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function($scope){
                    $scope.myImage=evt.target.result;
                });
            };
            console.log($scope.myCroppedImage);
            reader.readAsDataURL(file);
        };

        console.log('init');

        function base64ToBlob(base64Data, contentType) {
            contentType = contentType || '';
            var sliceSize = 1024;
            var byteCharacters = atob(base64Data);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);

            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);

                var bytes = new Array(end - begin);
                for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return new Blob(byteArrays, { type: contentType });
        }



        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

        $scope.savePhoto = function() {

            var file = base64ToBlob($scope.myCroppedImage.replace('data:image/png;base64,',''), 'image/jpeg');
            if (file) {
                Upload.upload({
                    url: '/api/uploads',
                    fields: {
                        type: file.type.split('/')[1]
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {

                    console.log(data.photo);
                });
                $scope.formData.photo.push({
                    file: file.size,
                    type: file.type
                });
                $rootScope.progressValue = 50;
            }
        };


        $scope.cancelPhoto = function() {

          $scope.myCroppedImage = null;

          $scope.myImage = null;
          $scope.formData.photo.length = 0;

        }
    });
