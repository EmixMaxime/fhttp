/**
 * 
 * Function to deal with request cookies
 * 
 */

const getCookie = (request, name) => request.cookies[name] || null;

const cookies = ({ getCookie }, sessionName) => {
  return (req) => ({
    getCookie: getCookie.bind(null, req),
    getSessionCookie: sessionName ? getCookie.bind(null, req, sessionName) : undefined,
  });
};

const cookiesFactory = deps => cookies.bind(null, deps);

module.exports = {
  cookies: cookiesFactory({ getCookie }),
  getCookie,
};
