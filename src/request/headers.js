const buildShortcuts = require('../buildShortcuts');
/**
 * 
 * Functions to deal with request headers
 * 
 */

const getHeader = (req, name) => req.headers[name];

const headers = ({ getHeader, buildShortcuts }, opts = {}) => {
  const { bind } = opts;
  const boundableFunction = [ getHeader ];

  return (req) => {
    const object = {
      getHeader: getHeader.bind(null, req),
    };
    
    const shortcuts = buildShortcuts(req, bind, boundableFunction);

    return Object.assign({}, object, shortcuts);
  };
};

const headersFactory = deps => headers.bind(null, deps);

module.exports = {
  headers: headersFactory({ getHeader, buildShortcuts }),
  getHeader,
};
