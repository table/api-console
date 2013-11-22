describe("RAML.Client.AuthStrategies.Oauth2.requestAccessToken", function() {
  var credentialsManager, requestAccessToken, scheme;

  beforeEach(function() {
    settings = {
      authorizationUri: 'https://example.com/oauth/authorize',
      accessTokenUri: 'https://example.com/oauth/access_token'
    }

    credentialsManager = jasmine.createSpyObj('credentialsManager', ['accessTokenParameters']);
    credentialsManager.accessTokenParameters.andReturn("data");
    requestAccessToken = RAML.Client.AuthStrategies.Oauth2.requestAccessToken(settings, credentialsManager);
  });

  describe("initiating an access token request", function() {
    var xhrSpy;

    beforeEach(function() {
      xhrSpy = spyOn($, 'ajax').andReturn(jasmine.createSpyObj('promise', ['then']));
      requestAccessToken('code');
    });

    describe('by default', function() {
      beforeEach(function() {
        requestAccessToken('code');
      });

      it("requests an access token", function() {
        expect(xhrSpy).toHaveBeenCalledWith({
          url: settings.accessTokenUri,
          type: 'post',
          data: 'data'
        });
      });
    });

    describe('with a proxy URL', function() {
      beforeEach(function() {
        RAML.Settings.proxy = 'http://www.someproxy.com/somepath/'
        requestAccessToken('code');
      });

      afterEach(function() {
        delete RAML.Settings.proxy;
      });

      it("proxies the request for the access token", function() {
        expect(xhrSpy.mostRecentCall.args[0].url).toEqual(
          RAML.Settings.proxy + settings.accessTokenUri
        );
      });
    });
  });
});
