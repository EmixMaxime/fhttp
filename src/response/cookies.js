/**
 * 
 * Function to deal with response cookies
 * 
 */

const setCookieBag = (
  { maxAge = 1 * 60 * 60 * 1000, secure = true, httpOnly = true }
) => (response, cookieName, data) => response.cookie(cookieName, data, { maxAge, secure, httpOnly });

const setCookie = (response, cookieName, data, opts = {}) => setCookieBag(opts)(response, cookieName, data);

/**
 * Usage : setCookie({secure: true, cookieName: 'XSRF-TOKEN'})(expressResponse, 'hello world');
 *
 * @param {Object} options 
 */
const createCookieBag = function ({ setCookieBag }, opts = {}) {
  const setCookie = setCookieBag(opts); // "Instanciate"

  const { cookieName } = opts;
  if (!cookieName) throw new Error("You can't create a setCookieBag without opts.cookieName");

  return (res) => ({ setCookie: setCookie.bind(null, res, cookieName) });
};

const createCookieBagFactory = deps => createCookieBag.bind(null, deps);

// Idée: je peux ajouter des setCookieBag : { 'name': bagFunction } lors de la création de l'objet cookies
// Ensuite c'est accessible depuis cookies.nameBag.bagFunction

/** Exemples to deal with csrf and jwt cookies in my applications */
const setSessionCookie = setCookieBag({ name: 'XSRF-TOKEN' });

const setJwtCookie = setCookieBag({
  secure: true,
  httpOnly: true,
  cookieName: 'JWT-TOKEN',
  maxAge: 1 * 60 * 60 * 1000,
});

const cookies = ({ setCookie }, options = {}) => {

  return (res) => ({
    setCookie: setCookie.bind(null, res),
  });

};

const cookiesFactory = deps => cookies.bind(null, deps);

module.exports = {
  cookies: cookiesFactory({ setCookie }),
  createCookieBag: createCookieBagFactory({ setCookieBag }),
  setCookie,
};
