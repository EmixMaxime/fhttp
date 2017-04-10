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

### getHeader (name)
```js
Request.getHeader('headerName'); // -> req.headers.headerName
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