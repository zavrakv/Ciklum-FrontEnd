(function () {
  angular
    .module('app.main')
    .run(appRun);
  
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates(), '/');
  }
  
  function getStates() {
    return [
      {
        state: 'servers',
        config: {
          url: '/servers/:id',
          component: 'serversComponent',
          params: {
            farm_id: 'farmId'
          },
          resolve: {
            server: function (FarmsFactory, $stateParams) {
              var farm_id;
              var server_id = $stateParams.id;
              $stateParams.farm_id !== 'farmId' ?
                farm_id = $stateParams.farm_id :
                farm_id = localStorage.getItem('current_farm');
  
              localStorage.setItem('current_farm', farm_id);
              
              return FarmsFactory.getServerStatus(farm_id, server_id)
                .then(function (res) {
                  return res;
                })
            }
          }
        }
      }
    ];
  }
})();