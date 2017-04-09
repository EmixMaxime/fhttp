const request = (
  { headers, cookies },
  { csrfHeaderName = null, cookiesOptions = {} }
  ) => {

  const headerss = headers(csrfHeaderName);
  const cookiess = cookies(cookiesOptions.sessionName);

  return (req) => {
    const Cookies = cookiess(req);
    const Headers = headerss(req);

    return Object.assign({}, Headers, Cookies);
  };
};

const requestFactory = deps => request.bind(null, deps);

module.exports = requestFactory;

// const Request = request(req); Request.getHeader('headername');