/**
 * Usage : setCookie({secure: true, cookieName: 'XSRF-TOKEN'})(expressResponse, 'hello world');
 *
 * @param {Object} options 
 */
const setCookie = function (options = {}) {

  const defaultOptions = {
    maxAge: 1 * 60 * 60 * 1000, // = 1 hour
    cookieName: 'emixcookie',
    secure: false, // Warning
    httpOnly: false, // Warning
  };

  const opts = Object.assign({}, defaultOptions, options);
  const { cookieName, secure, httpOnly, maxAge } = opts;
  Object.freeze(opts);

  return (response, data) => response.cookie(cookieName, data, { secure, httpOnly, maxAge });
};

/** Exemples to deal with csrf and jwt cookies in my applications */
const getSessionCookie = setCookie({ name: 'XSRF-TOKEN' });

const setJwtCookie = setCookie({
  secure: true,
  httpOnly: true,
  cookieName: 'JWT-TOKEN',
  maxAge: 1 * 60 * 60 * 1000,
});
