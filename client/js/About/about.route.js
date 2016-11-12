(function () {
  'use strict';
  angular.module('App.about')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'about',
        config: {
          url: '/about',
          templateUrl: 'views/about.template.html',
          controller: 'AboutController',
          controllerAs: 'about',
          navItem: {
            displayName: 'About',
            sref: 'about',
          },
        },
      },
    ];
  }
}());
