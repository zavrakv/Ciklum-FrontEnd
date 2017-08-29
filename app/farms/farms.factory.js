(function () {
  'use strict';
  
  angular
    .module('app.farms')
    .factory('FarmsFactory', MainFactory);
  
  MainFactory.$inject = ['$http', 'Config', '$q'];
  
  
  function MainFactory($http, Config, $q) {
    return {
      getAllFarms: getAllFarms
    };
    
    function getAllFarms() {
      var request = $http({
        method: 'GET',
        url: Config.getAllFarms
      });
      return (request.then(handleSuccess, handleError));
    }
    
    
    function handleSuccess(response) {
      return ( response.data );
    }
    
    function handleError(response) {
      if (!angular.isObject(response.data) || !response.data.message) {
        return ( $q.reject("An unknown error occurred.") );
      }
      return ( $q.reject(response.data.message) );
    }
  }
  
})();

