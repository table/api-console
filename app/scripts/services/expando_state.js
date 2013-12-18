(function() {
  'use strict';

  RAML.Services.ExpandoState = function() {
    var state = {};

    return {
      get: function(key) {
        return state[key];
      },
      set: function(key, value) {
        state[key] = value;
      },
      cleanYoSelf: function(inspector) {
        var cleaned = {};

        inspector.resources.forEach(function(resource) {
          var key = resource.pathSegments.map(function(segment) { return segment.toString(); }).join('');
          if (state[key]) {
            cleaned[key] = state[key];
            resource.methods.forEach(function(method) {
              var moreKey = key + method.method;
              cleaned[moreKey] = state[moreKey];
            });
          }
        });

        state = cleaned;
      }
    };
  };
})();
