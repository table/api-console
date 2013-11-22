(function() {
  'use strict';

  RAML.Client.AuthStrategies.Oauth2.requestAccessToken = function(settings, credentialsManager) {
    return function(code) {
      var url = settings.accessTokenUri;
      if (RAML.Settings.proxy) {
        url = RAML.Settings.proxy + url;
      }

      return $.ajax({
        url: url,
        type: 'post',
        data: credentialsManager.accessTokenParameters(code)
      });
    };
  };
})();
