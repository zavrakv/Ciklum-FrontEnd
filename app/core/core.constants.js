(function () {
  'use strict';
  
  angular
    .module('app.core')
    .constant('Config', (function () {
      
      var API_DOMAIN = 'http://207.154.201.232:3000' + '/api/';
      return {
        
        //Farms
        getAllFarms: API_DOMAIN + 'farms/get-all-farms',
        
        //Servers
        getServerStatus: API_DOMAIN + 'servers/get-server-status',
        getAllServersStatus: API_DOMAIN + 'servers/get-all-servers-status'
      }
    })());
})();
