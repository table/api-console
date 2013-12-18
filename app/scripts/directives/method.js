(function() {
  'use strict';

  var controller = function($scope, ExpandoState) {
    $scope.methodView = this;
    this.method = $scope.method;

    var resourceExpandoKey = $scope.resource.pathSegments.map(function(segment) { return segment.toString(); }).join('');
    this.expandoKey = resourceExpandoKey + this.method.method;

    this.ExpandoState = ExpandoState;
    this.expanded = ExpandoState.get(this.expandoKey)
  };

  controller.prototype.toggleExpansion = function(evt) {
    evt.preventDefault();
    this.expanded = !this.expanded;

    this.ExpandoState.set(this.expandoKey, this.expanded);
  };

  controller.prototype.cssClass = function() {
    if (this.expanded) {
      return 'expanded ' + this.method.method;
    } else {
      return 'collapsed ' + this.method.method;
    }
  };

  RAML.Directives.method = function() {
    return {
      controller: controller,
      require: ['^resource', 'method'],
      restrict: 'E',
      templateUrl: 'views/method.tmpl.html',
      replace: true,
      link: function(scope, element, attrs, controllers) {
        var resourceView = controllers[0],
            methodView   = controllers[1];

        if (resourceView.expandInitially(scope.method)) {
          methodView.expanded = true;
        }
      }
    };
  };
})();
