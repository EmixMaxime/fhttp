const response = (
  { cookies },
  options = {}
) => {

  const cookiess = cookies(options.cookiesOptions);

  return (res) => {
    const Cookies = cookiess(res);
    
    return Object.assign({}, Cookies);
  }
};

const responseFactory = deps => response.bind(null, deps);
module.exports = responseFactory;
