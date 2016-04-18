'use strict';

class NavbarController {
  //start-non-standard
  //menu = [{
  //  'title': 'Funds',
  //  'state': 'funds'
  //}];

  isCollapsed = true;
  //end-non-standard

  constructor() {
    }
}

angular.module('fundlistApp')
  .controller('NavbarController', NavbarController);
