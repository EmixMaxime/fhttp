/**
 * 
 * Functions to deal with request
 * 
 */

const getHeader = (req, name) => req.headers[name] || null;
const getHeaders = req => req.headers || null;

const getParam = (req, name) => req.params[name] || null;
const getParams = req => req.params || null;

const getCookie = (req, name) => req.cookies[name] || null;
const getCookies = req => req.cookies || null;

const getBody = (req, name) => name ? req.body[name] || null : req.body || null;

const getQuery = (req, name) => req.query[name] || null;
const getQueries = req => req.query;

const getMethod = req => req.method;

module.exports = {
  getHeader, getHeaders,
  getParam, getParams,
  getCookie, getCookies,
  getBody,
  getMethod,
  getQuery, getQueries
};
