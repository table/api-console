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
      }
    }
  };
})();
