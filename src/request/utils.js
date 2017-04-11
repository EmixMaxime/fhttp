/**
 * 
 * Functions to deal with request
 * 
 */

const getHeader = (req, name) => req.headers[name] || null;

const getParam = (req, name) => req.params[name] || null;

const getCookie = (req, name) => req.cookies[name] || null;

module.exports = {
  getHeader,
  getParam,
  getCookie
};
