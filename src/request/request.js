const request = (
  { headers, cookies },
  options = {}
  ) => {

  const headerss = headers(options.headersOptions);
  const cookiess = cookies(options.cookiesOptions);

  return (req) => {
    const Cookies = cookiess(req);
    const Headers = headerss(req);

    return Object.assign({}, Headers, Cookies);
  };
};

const requestFactory = deps => request.bind(null, deps);

module.exports = requestFactory;

// const Request = request(req); Request.getHeader('headername');