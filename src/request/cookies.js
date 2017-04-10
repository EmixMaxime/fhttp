const buildShortcuts = require('../buildShortcuts');

/**
 * 
 * Function to deal with request cookies
 * 
 */

const getCookie = (request, name) => request.cookies[name] || null;

const cookies = ({ getCookie, buildShortcuts }, opts = {}) => {
  const { bind } = opts;
  const boundableFunctions = [ getCookie ];

  return (req) => {
    const object = {
      getCookie: getCookie.bind(null, req),
    };

    const shortcuts = buildShortcuts(req, bind, boundableFunctions);
    
    return Object.assign({}, object, shortcuts);
  };
};

const cookiesFactory = deps => cookies.bind(null, deps);

module.exports = {
  cookies: cookiesFactory({ getCookie, buildShortcuts }),
  getCookie,
};
