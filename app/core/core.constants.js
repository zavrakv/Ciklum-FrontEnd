(function () {
  'use strict';
  
  angular
    .module('app.core')
    .constant('Config', (function () {
      
      var API_DOMAIN = 'http://localhost:3000' + '/api/farms/';
      return {
        
        //Farms
        getAllFarms: API_DOMAIN + 'get-all-farms'
      }
    })());
})();
