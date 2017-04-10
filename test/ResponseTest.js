const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const response = require('../src/response/ResponseServiceProvider');
const { createCookieBag, setCookie } = require('../src/response/cookies');

const fakeExpressResponse =  {
  headers: {},
  cookie: () => {},
};

describe('Response', () => {

  describe('#cookies', () => {

    describe('#setCookie', () => {

      it('It should contains setCookie properly', () => {
        const sessionName = 'emixid';
        const responsee = response({ cookiesOptions: { cookieName: sessionName } });
        const Response = responsee(fakeExpressResponse);

        const functionsName = ['setCookie'];

        functionsName.forEach(name => {
          expect(Response).to.have.property(name).and.to.be.a('function');
        });
      });

      it('It should calls response.cookie function with good args', () => {
        const sessionName = 'emixid';
        const valueSession = 'hello-world';

        const responsee = response({ cookiesOptions: { httpOnly: false } });
        const Response = responsee(fakeExpressResponse);

        const responseCookieSpy = sinon.spy(fakeExpressResponse, 'cookie');
        Response.setCookie(sessionName, valueSession);

        const args = responseCookieSpy.args[0];
        expect(args[0], 'Wrong cookieName').to.be.equal(sessionName);
        expect(args[1], 'Wrong cookie data').to.be.equal(valueSession);
        expect(args[2].httpOnly).to.be.false;

        responseCookieSpy.restore();
      });

    });

    describe('#createCookieBag', () => {

      it('It should be a function', () => {
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

      it('It should call setCookie properly', () => {
        const opts = {
          secure: true,
          httpOnly: true,
          cookieName: 'JWT-TOKEN',
          maxAge: 55555656555,
        };
        const value = 'hello-wooorld';

        const bag = createCookieBag(opts);
        const responseCookieSpy = sinon.spy(fakeExpressResponse, 'cookie');
        
        const jwtCookieBag = bag(fakeExpressResponse);

        const setCookieSpy = sinon.spy(jwtCookieBag, 'setCookie');

        jwtCookieBag.setCookie(value);

        expect(setCookieSpy.args[0][0]).to.be.equal(value);

        const [ cookieName, valuee, options ] = responseCookieSpy.args[0];

        expect(cookieName).to.be.equal(opts.cookieName);
        
        delete opts.cookieName;
        expect(options).to.be.deep.eql(opts);
        expect(valuee).to.be.equal(value);

        setCookieSpy.restore;

      });

    });

  });

});