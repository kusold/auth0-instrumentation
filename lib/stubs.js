const noop = function() {};
const returnEmptyLogger = function() { return emptyLogger; };
const returnValue = function() { return 1; };
const emptyMiddleware = function () {};

const emptyLogger = {
  child: returnEmptyLogger,
  trace: noop,
  debug: noop,
  info: noop,
  warn: noop,
  error: noop,
  fatal: noop
};

const emptyErrorReporter = {
  isActive: false,
  captureException: noop,
  captureMessage: noop,
  patchGlobal: noop,
  hapi: {
    plugin: {
      register: emptyMiddleware,
      pkg: require('../package.json'),
    },
  },
  express: {
    requestHandler: emptyMiddleware,
    errorHandler: emptyMiddleware
  },
};

const emptyMetrics = {
  isActive: false,
  gauge: noop,
  increment: noop,
  histogram: noop,
  flush: noop,
  setDefaultTags: noop,
  startResourceCollection: noop,
  time: returnValue,
  endTime: noop,
  callback: noop
};

const emptyProfiler = {
  setupProcessListener: noop,
  createDebouncedSnapshot: noop,
  report: noop,
  setupGCReporter: noop
};

module.exports = {
  logger: emptyLogger,
  errorReporter: emptyErrorReporter,
  metrics: emptyMetrics,
  profiler: emptyProfiler
};
