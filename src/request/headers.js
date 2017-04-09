/**
 * 
 * Functions to deal with request headers
 * 
 */

const getHeader = (req, name) => req.headers[name];

const headers = ({ getHeader }, csrfHeaderName) => {
  return (req) => ({
    getHeader: getHeader.bind(null, req),
    getCsrfHeader: csrfHeaderName ? getHeader.bind(null, req, csrfHeaderName) : undefined,
  });
};

const headersFactory = deps => headers.bind(null, deps);

module.exports = {
  headers: headersFactory({ getHeader }),
  getHeader,
};
