const chai = require('chai');
const expect = chai.expect;

const { response, request, createCookieBag } = require('../index');

describe('Index', () => {

  it('It should exports response/request functions', () => {
    expect(response).to.be.a('function');
    expect(request).to.be.a('function');
    expect(createCookieBag).to.be.a('function');
  });

  it('It should exports good functions', () => {
    const responsee = response();
    const requestt = request();

    const Response = responsee({});
    const Request = requestt({ cookies: {}});

    expect(Request).to.have.property('getHeader').and.be.a('function');
    expect(Response).to.have.property('setCookie').and.be.a('function');
  });
});
