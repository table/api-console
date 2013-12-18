'use strict';

(function() {

  var controller = function($scope, ExpandoState) {
    this.tabs = $scope.tabs = [];
    $scope.tabset = this;
    this.expandoKey = $scope.expandoKey;
    this.ExpandoState = ExpandoState;
  };


  controller.prototype.select = function(tab, IGNORE_ME) {
    if (tab.disabled) {
      return;
    }
    this.tabs.forEach(function(tab) {
      tab.active = false;
    });
    if (!IGNORE_ME) {
      this.ExpandoState.set(this.expandoKey, tab.heading);
    }
    tab.active = true;
  };

  controller.prototype.addTab = function(tab) {
    var state = this.ExpandoState.get(this.expandoKey);

    if (this.tabs.every(function(tab) { return tab.disabled; }) || state === tab.heading || tab.active) {
      this.select(tab, true);
    }
    this.tabs.push(tab);
  };


  RAML.Controllers.tabset = controller;

})();
