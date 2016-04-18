'use strict';

angular.module('fundlistApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('funds', {
        url: '/',
        template: '<funds></funds>'
      });
  });
