(function() {
  'use strict';

  function isEmpty(object) {
    return Object.keys(object || {}).length === 0;
  }

  var FORM_MIME_TYPES = ['application/x-www-form-urlencoded', 'multipart/form-data'];

  function hasFormParameters(method) {
    return FORM_MIME_TYPES.some(function(type) {
      return method.body && method.body[type] && !isEmpty(method.body[type].formParameters);
    });
  }

  var controller = function($scope) {
    $scope.documentation = this;

    this.resource = $scope.resource;
    this.method = $scope.method;

    this.hasResponseDocumentation = !isEmpty(this.method.responses);
    this.hasTryIt = !!$scope.api.baseUri;
  };

  controller.prototype.hasParameters = function() {
    return !!(this.resource.uriParameters || this.method.queryParameters ||
      this.method.headers || hasFormParameters(this.method));
  };

  controller.prototype.hasRequestDocumentation = function() {
    return this.hasParameters() || !isEmpty(this.method.body);
  }

  controller.prototype.traits = function() {
    return (this.method.is || []);
  };

  RAML.Controllers.Documentation = controller;
})();
