const request = (
  { getHeader, getParam, getCookie, buildShortcuts },
  opts = {}
  ) => {

  const { bind } = opts;
  const boundableFunctions = [ getHeader, getParam, getCookie ];

  return (req) => {
    const object = {
      getHeader: getHeader.bind(null, req),
      getParam: getParam.bind(null, req),
      getCookie: getCookie.bind(null, req),
    };

    const shortcuts = buildShortcuts(req, bind, boundableFunctions);
    return Object.assign({}, object, shortcuts);

  };
};

const requestFactory = deps => request.bind(null, deps);
module.exports = requestFactory;
