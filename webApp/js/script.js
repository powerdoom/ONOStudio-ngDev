/************************************************************************
 *  Version: Beta - 0.0.0                                               *
 *  Author: Lorgan Sherwood                                             *
 *  DataTime: 2014/10/13                                                *
 *  Description:                                                        *
 *  Copyright ©2014 ONO-191 Studio. All Rights Reserved.                *
 ***********************************************************************/

var OnoStudioApp = angular.module('OnoStudioApp', []);

OnoStudioApp.factory('StudioFactory', function($http, $q) {
  var service = {};
  var baseUrl = 'https://itunes.apple.com/search?term=';
  var _artist = '';
  var _finaUrl = '';

  var makeUrl = function() {
    _artist = _artist.split(' ').join('+');
    _finaUrl = baseUrl + _artist + '%callback=JSON_CALLBACK'
    return _finaUrl;
  }

  service.setArtist = function(artist) {
    _artist = artist;
  }

  service.getArtist = function() {
    return _artist;
  }

  service.callItunes = function() {
    makeUrl();
    var deferred = $q.defer();
    $http({
      method: 'JSONP',
      url: _finaUrl
    }).success(function(data) {
        deferred.resolve(data);
    }).error(function() {
        deferred.reject('There was an error')
    })
    return deferred.promise;
  }

  return service;
});

OnoStudioApp.controller('StudioFactoryController', function($scope, StudioFactory) {
  $scope.data = {};
  $scope.updateArtist = function() {
    StudioFactory.setArtist($scope.data.artist);
  };

  $scope.submitArtist = function() {
    StudioFactory.callItunes()
      .then(function(data) {
          $scope.data.artistData = data;
        }, function(data) {
          alert(data);
        })
  }
});

