module.exports = function(pkg, env) {
  if (!env.ERROR_REPORTER_URL) {
    return require('./stubs').errorReporter;
  }

  const raven = require('raven');
  const client = new raven.Client(env.ERROR_REPORTER_URL);

  const plugin = {
    pkg: require('../package.json'),
    register: function ErrorReporter(server, options) {
      server.expose('client', client);
      server.events.on({name: 'request', channels: 'error'}, function (request, err) {
        client.captureError(err, {
          extra: {
            timestamp: request.info.received,
            id: request.id,
            method: request.method,
            path: request.path,
            payload: request.pre && request.pre._originalPayload,
            query: request.query,
            remoteAddress: request.info.remoteAddress,
            userAgent: request.raw.req.headers['user-agent']
          },
          tags: options.tags
        });
      });
    }
  };
  client.hapi = { plugin, };

  client.express = {
    requestHandler: raven.middleware.express.requestHandler(env.ERROR_REPORTER_URL),
    errorHandler: raven.middleware.express.errorHandler(env.ERROR_REPORTER_URL)
  };

  client.isActive = true;
  return client;
};
