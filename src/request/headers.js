const buildShortcuts = require('../buildShortcuts');
/**
 * 
 * Functions to deal with request headers
 * 
 */

const getHeader = (req, name) => req.headers[name];

const getParam = (req, name) => req.params[name];

const headers = ({ getHeader, getParam, buildShortcuts }, opts = {}) => {
  const { bind } = opts;
  const boundableFunction = [ getHeader, getParam ];

  return (req) => {
    const object = {
      getHeader: getHeader.bind(null, req),
      getParam: getParam.bind(null, req),
    };
    
    const shortcuts = buildShortcuts(req, bind, boundableFunction);

    return Object.assign({}, object, shortcuts);
  };
};

const headersFactory = deps => headers.bind(null, deps);

module.exports = {
  headers: headersFactory({ getHeader, getParam, buildShortcuts }),
  getHeader,
};
