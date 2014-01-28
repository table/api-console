(function() {
  'use strict';

  var controller = function($scope, DataStore, $element) {
    $scope.resourceView = this;
    this.resource = $scope.resource;
    this.DataStore = DataStore;
    this.expanded = this.DataStore.get(this.resourceKey());

    this.el = $element;
    this.scope = $scope;
  };

  controller.prototype.resourceKey = function() {
    return this.resource.toString();
  };

  controller.prototype.expandInitially = function(method) {
    if (method.method === this.methodToExpand) {
      delete this.methodToExpand;
      return true;
    }
    return false;
  };

  controller.prototype.expandMethod = function(method) {
    // var maxHeight = this.el[0].offsetHeight;
    // var paddingTop = this.el[0].offsetTop;
    // console.log(this.el, maxHeight, paddingTop);

    // var el = this.el;

    // el.css('max-height', maxHeight + 'px');
    // el.css('padding-top', paddingTop + 'px');
    // el.css('margin-top', '-' + paddingTop + 'px');

    // setTimeout(function() {
    //   el.css('max-height', null);
    //   el.css('padding-top', null);
    //   el.css('margin-top', null);
    // }, 100);

    this.methodToExpand = method.method;
    this.scope.method = method;
  };

  controller.prototype.collapseMethod = function() {
    this.scope.method = undefined;
  };

  controller.prototype.toggleExpansion = function() {
    this.expanded = !this.expanded;
    this.DataStore.set(this.resourceKey(), this.expanded);
  };

  RAML.Controllers.Resource = controller;

})();
