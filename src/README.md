# Frequest (functionnal request)
Are you hate to do this : req.body.something, or req.params.something when you're working with express ?
If your answer is yes, so frequest has been made for you! <br />
It's a set of functions to deal with request from express.
Why ? "Just" to improve the testability, it's too bad to use directly the req.xxx functions.

Don't forget to use the cookieParser and bodyParser at the top of the app

# Status
I'am working on it, so everything is not stable.

# Requirements
NodeJS >= 7.6, for support of greatest things (Async + Await)!
It's not an LTS version, so I will transpile the code for v6.10.2 (the last LTS).

# Usage
## getHeader
`getHeader(name); // -> req.headers[name]`

