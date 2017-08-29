(function () {
  angular
    .module('app.farms')
    .run(appRun);
  
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates(), '/');
  }
  
  function getStates() {
    return [
      {
        state: 'farms-edit',
        config: {
          url: '/farms-edit',
          component: 'farmsComponent',
          resolve: {
          
          }
        }
      }
    ];
  }
})();
