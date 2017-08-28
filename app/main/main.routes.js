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
        state: 'main',
        config: {
          url: '/',
          component: 'mainComponent',
          resolve: {
          
          }
        }
      }
    ];
  }
})();