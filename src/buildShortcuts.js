const buildShortcuts = (req, bindOptions = {}, boundableFunction = []) => {
  const shortcuts = {};

  if (bindOptions) {
    Object.keys(bindOptions).forEach(functionName => {
      const opts = bindOptions[functionName];
      opts.forEach(opt => {
        const f = boundableFunction.map(f => f.name === functionName ? f : false);
        const referenceFunction = f[0];

        if (f && typeof referenceFunction === 'function') {
          console.log({opts});
          shortcuts[opt.name] = referenceFunction.bind(null, req, opt.value);
        }
      });

    });
  };

  return shortcuts;
}

module.exports = buildShortcuts;
