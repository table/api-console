(function() {
  'use strict';

  var controller = function($scope, ExpandoState) {
    $scope.resourceView = this;
    this.resource = $scope.resource;
    this.ExpandoState = ExpandoState;

    var expandoKey = this.resource.pathSegments.map(function(segment) { return segment.toString(); }).join('');
    this.expanded = ExpandoState.get(expandoKey)
  };

  controller.prototype.expandInitially = function(method) {
    if (method.method === this.methodToExpand) {
      delete this.methodToExpand;
      return true;
    }
    return false;
  };

  controller.prototype.expandMethod = function(method) {
    this.methodToExpand = method.method;
  };

  controller.prototype.toggleExpansion = function() {
    this.expanded = !this.expanded;
    var expandoKey = this.resource.pathSegments.map(function(segment) { return segment.toString(); }).join('');

    this.ExpandoState.set(expandoKey, this.expanded);
  };

  controller.prototype.type = function() {
    return this.resource.resourceType;
  };

  controller.prototype.traits = function() {
    return this.resource.traits || [];
  };

  RAML.Directives.resource = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/resource.tmpl.html',
      replace: true,
      controller: controller
    };
  };
})();
