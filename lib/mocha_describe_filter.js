// eslint-disable-next-line mocha/no-exports
module.exports = {
  describeFilter: function (skips) {
    let set = new Set(skips);
    return function (title, suite) {
      set.has(title) || describe(title, suite);
    };
  },
};
