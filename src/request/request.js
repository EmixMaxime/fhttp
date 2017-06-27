const request = (
  deps = {},
  opts = {}
  ) => {

    const {
    getHeader, getHeaders,
    getParam, getParams,
    getCookie, getCookies,
    getBody,
    getQuery, getQueries,
    getMethod,
    buildShortcuts
  } = deps;

  const { bind } = opts;
  const boundableFunctions = [ getHeader, getParam, getCookie, getBody, getQuery ];

  return (req) => {
    // if (!req.cookies) throw new Error('req.cookies is undefined. Please use the cookie-parser middleware');
    const object = {};
    Object.keys(deps).forEach(dep => {
      object[dep] = deps[dep].bind(null, req);
    });

    const shortcuts = buildShortcuts(req, bind, boundableFunctions);
    return Object.assign({}, object, shortcuts);

  };
};

const requestFactory = deps => request.bind(null, deps);
module.exports = requestFactory;
