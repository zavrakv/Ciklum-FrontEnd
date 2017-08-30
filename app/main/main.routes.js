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
            farms: function (FarmsFactory) {
              var farms;
              
              FarmsFactory.getAllFarms()
                .then(function (res) {
                  farms = res;
                });
  
              return FarmsFactory.getAllServersStatus()
                .then(function (res) {
                  var count = 0;
                  for (var i = 0; i < farms.length; i++) {
                    for (var j = 0; j < farms[i].servers.length; j++) {
                      farms[i].servers[j].status = res[count];
                      count += 1;
                    }
                  }
                  return farms;
                });
              
            }
          }
        }
      }
    ];
  }
})();