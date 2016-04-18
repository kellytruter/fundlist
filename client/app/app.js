'use strict';

angular.module('fundlistApp', [
  'fundlistApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'highcharts-ng'
])
  .config(function($urlRouterProvider, $locationProvider) {

      $urlRouterProvider
          .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  // adding custom filter for funds[x].shareClasses[y]['Launch Date']
    .filter('launchDateFormat', function () {
        return function (item) {
            var date = new Date(item);
            var day = date.getDate();
            var month = parseInt(date.getMonth()) + 1;
            var year = date.getFullYear();

            if (month < 10) {
                month = '0' + month;
            }

            return month + '/' + day + '/' + year;
        };
    })
    // adding custom filter for funds[x].shareClasses[y]['Launch Date']
    .filter('defaultDateFormat', function () {
        return function (item) {
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var date = new Date(item);
            var day = date.getDate();
            var month = parseInt(date.getMonth());
            var year = date.getFullYear();

            return day + ' ' + monthNames[month] + ' ' + year;
        };
    })
    // for defaulting values to '-' when not set.
    .filter('default', function () {
        return function (item, defaultValue) {
            if ((typeof item === 'undefined') || item === null || item === '' || (item.constructor == Array && item.length == 0) || item === false || item === 0) {
                item = defaultValue;
            }

            return item;
        };
    });


