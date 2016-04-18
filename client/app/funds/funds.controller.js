'use strict';

(function() {

class FundsController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.funds = [];

    this.updateFunds = function(funds) {

      var controller = this;

      // Iterate funds list
      angular.forEach(funds, function(fund, key) {
        // set primary share class index for display.
        funds[key]['shareClassesPrimary'] = 0;

        // default the display of the chart for the fund container to false.
        funds[key]['displayChart'] = false;
        funds[key]['displayChartLoading'] = true;

        angular.forEach(fund.shareClasses, function(shareClass, shareClassKey) {
          // calculate the age of the share
          funds[key]['shareClasses'][shareClassKey]['Launch Date Age'] = controller.calculateAge(new Date(funds[key]['shareClasses'][shareClassKey]['Launch Date']));

          // defaulting the chart data for the share
          funds[key]['shareClasses'][shareClassKey]['chartConfig'] = {
            options: {
              chart: {
                type: 'line',
                zoomType: 'x'
              }
            },
            xAxis: { type: 'datetime' },
            series: [],
            title: {
              text: ''
            },
            loading: false
          };
        });
      });

      // return updated funds
      this.funds = funds;
    };

    this.loadChartData = function(isin, from, to, onComplete) {
      this.$http.get('/assets/data/chart.json').then(response => {

        // As per instructions "isin, from & to" are dummy parameters
        // We will just return the same chart data
        onComplete(response.data.chart);
      });
    };

    this.disableClick = function($event) {
      $event.stopPropagation();
    };

    this.switchShare = function(fund, selectedOption) {
      this.getShareChart(fund, selectedOption);
    };

    this.isEmpty = function(item) {
      return ((typeof item === 'undefined') || item === null || item === '' || (item.constructor == Array && item.length == 0) || item === false || item === 0);
    };

    this.calculateAge = function(date) { // birthday is a date
      var ageDifMs = Date.now() - date.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    this.getShareChart = function(fund, shareClassIndex) {

      // If there is already cache for this data, do continue
      if (this.isEmpty(fund.shareClasses[shareClassIndex].chartConfig.series)) {

        // display loading text.
        fund.displayChartLoading = true;

        var shareClass = fund.shareClasses[shareClassIndex];

        // parse report date fields
        var fromDate = new Date(shareClass['Report Date From']);
        var toDate = new Date(shareClass['Report Date To']);

        // load chart
        this.loadChartData(shareClass['ISIN Code'], fromDate.getTime(), toDate.getTime(), function(chartData) {
          // hide the loading text.
          fund.displayChartLoading = false;

          // update reference share class with its corresponding chart config data.
          fund.shareClasses[shareClassIndex].chartConfig.series = chartData;
        });
      }

    };

    this.toggleChart = function(fund) {
      // toggle display of chart.
      fund.displayChart = !fund.displayChart;

      // identify the currently selected share class
      this.getShareChart(fund, fund.shareClassesPrimary);
    };

  }

  // initialize fund listing, by fetching funds from the funds.json file.
  $onInit() {
    this.$http.get('/assets/data/funds.json').then(response => {
      this.updateFunds(response.data.funds);
    });
  }


}

angular.module('fundlistApp')
  .component('funds', {
    templateUrl: 'app/funds/funds.html',
    controller: FundsController
  });

})();
