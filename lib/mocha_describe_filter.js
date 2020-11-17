// eslint-disable-next-line mocha/no-exports
module.exports = {
  describeFilter: function (skips = new Set()) {
    return function (title, suite) {
      skips.has(title) || describe(title, suite);
    };
  },
};
