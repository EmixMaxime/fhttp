const response = (
  { cookies },
  { cookiesOptions }
) => {

  const cookiess = cookies(cookiesOptions);

  return (res) => {
    const Cookies = cookiess(res);
    
    return Object.assign({}, Cookies);
  }
};

const responseFactory = deps => response.bind(null, deps);
module.exports = responseFactory;
