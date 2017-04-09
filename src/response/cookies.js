/**
 * 
 * Function to deal with response cookies
 * 
 */

const setCookie = (
  { maxAge = 1 * 60 * 60 * 1000, secure = true, httpOnly = true }
) => (response, cookieName, data) => response.cookie(cookieName, data, { maxAge, secure, httpOnly });

/**
 * Usage : setCookie({secure: true, cookieName: 'XSRF-TOKEN'})(expressResponse, 'hello world');
 *
 * @param {Object} options 
 */
const createCookieBag = function ({ setCookie }, opts = {}) {
  const setCookiee = setCookie(opts); // "Instanciate"

  const { cookieName } = opts;
  if (!cookieName) throw new Error("You can't create a setCookieBag without opts.cookieName");

  return (res) => ({ setCookie: setCookiee.bind(null, res, cookieName) });
};

const createCookieBagFactory = deps => createCookieBag.bind(null, deps);

// Idée: je peux ajouter des setCookieBag : { 'name': bagFunction } lors de la création de l'objet cookies
// Ensuite c'est accessible depuis cookies.nameBag.bagFunction

/** Exemples to deal with csrf and jwt cookies in my applications */
const setSessionCookie = setCookie({ name: 'XSRF-TOKEN' });

const setJwtCookie = setCookie({
  secure: true,
  httpOnly: true,
  cookieName: 'JWT-TOKEN',
  maxAge: 1 * 60 * 60 * 1000,
});

const cookies = ({ setCookie }, options, bags = []) => {
  const setCookiee = setCookie(options); // "Instanciate"

  return (res) => ({
    setCookie: setCookiee.bind(null, res),
  });
};

const cookiesFactory = deps => cookies.bind(null, deps);

module.exports = {
  cookies: cookiesFactory({ setCookie }),
  createCookieBag: createCookieBagFactory({ setCookie }),
};
