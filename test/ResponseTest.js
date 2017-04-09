const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const response = require('../src/response/ResponseServiceProvider');
const { createCookieBag } = require('../src/response/cookies');

const fakeExpressResponse =  {
  headers: {},
  cookie: () => {},
};

describe('Response', () => {

  describe('#cookies', () => {

    it('It should contains all functions', () => {
      const sessionName = 'emixid';
      const responsee = response({ cookiesOptions: { cookieName: sessionName } }); // "Instanciate"
      const Response = responsee(fakeExpressResponse);

      const functionsName = ['setCookie'];

      functionsName.forEach(name => {
        expect(Response[name]).to.be.a('function');
      });
    });

    it('It should add my created cookieBag', () => {
      const opts = {
        secure: true,
        httpOnly: true,
        cookieName: 'JWT-TOKEN',
        maxAge: 1 * 60 * 60 * 1000,
      };

      const bag = createCookieBag(opts);
      const jwtCookieBag = bag(fakeExpressResponse);

      expect(jwtCookieBag.setCookie).to.be.a('function');
    });

    describe('#setCookie', () => {

      it('It should calls response.cookie function with good args', () => {
        const sessionName = 'emixid';
        const valueSession = 'hello-world';

        const responsee = response({ cookiesOptions: { cookieName: sessionName } }); // "Instanciate"
        const Response = responsee(fakeExpressResponse);

        Response.setCookie(valueSession);

        // expect(fakeExpressResponse[sessionName]).to.be.equal(valueSession);
      });


    });

  });

});