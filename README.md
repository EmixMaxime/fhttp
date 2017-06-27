# fhttp
Functions to deal with Request/Response using expressjs.
Why ? "Just" to improve the testability, it's too bad to use directly the req.xxx functions


# API

## Request
### Options
You need to call a function to registrate your options, and then create our Request object.
```js
import { requestt } from 'fhttp';

const options = {};
const request = requestt(options);

app.get('/route', (req, res) => {
  const Request = request(req); // Okay, work on this request
  // Now, you can use functions on it to make your life easier

  Request.getHeader('headerName'); // -> req.headers.headerName
});
```

### getBody(name)
```js
Request.getBody(); // req.body
Request.getBody("name"); // req.body.name
```

### getHeaders / getHeader(name)
```js
Request.getHeaders(); // -> req.headers
Request.getHeader('headerName'); // -> req.headers.headerName
Request.getHeaders('headerName'); // -> req.headers.headerName
```

### getParams / getParam(name)
```js
Request.getParams(); // -> req.params
Request.getParam('paramName'); // -> req.params.paramName
Request.getParams('paramName'); // -> req.params.paramName
```

### getQueries / getQuery(name)
```js
Request.getQueries(); // -> req.query
Request.getQuery("queryName"); // -> req.query.queryName
Request.getQueries("queryName"); // -> req.query.queryName
```

### getCookies / getCookie(name)
```js
Request.getCookies(); // -> req.cookies
Request.getCookie("cookieName"); // -> req.cookies.cookieName
Request.getCookies("cookieName"); // -> req.cookies.cookieName
```

### getMethod
```js
Request.getMethod(); // -> req.method
```

### Add shortcut
```js
const options = {
  bind: {
    getHeader: [
      { name: 'getCsrfHeader', value: 'CSRF-TOKEN' },
    ],
  }
};
const request = requestt(options);

app.get('/', (req, res) => {
  const Request = request(req);

  Request.getCsrfHeader(); // -> req.headers['CSRF-TOKEN']
});
```

## Response
### Options
You need to call a function to registrate your options, and then create our Response object.
```js
import { response } from 'fhttp';
const responsee = response(options);

app.get('/route', (req, res) => {
  const Response = responsee(req); // Okay, work on this response
  // Now, you can use functions on it to make your life easier
});
```

## cookies

### setCookies
```js
Response.setCookie('cookieName', 'cookieValue'); // Not options provided, defaults options will be applied.
```
The options parameter is an object that can have the same properties as express [res.cookies](http://expressjs.com/fr/api.html#res.cookie).

### createCookieBag
```js
const opts = {
  secure: true,
  httpOnly: true,
  cookieName: 'JWT-TOKEN',
  maxAge: 55555656555,
};

const jwtCookieBag = createCookieBag(opts);

app.get('', (req, res) => {
  const JwtCookie = jwtCookieBag(response);
  JwtCookie.setCookie('jwtValue');
});
```
