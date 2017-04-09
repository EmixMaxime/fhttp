const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const response = require('../src/response/ResponseServiceProvider');

const fakeExpressRequest =  {
  headers: {},
  cookies: {},
};

describe('Response', () => {

  describe('#cookies', () => {

    it('It should contains all functions', () => {
      const sessionName = 'emixid';
      const responsee = response({ cookiesOptions: { sessionName } }); // "Instanciate"
      const Response = responsee(fakeExpressRequest);

      const functionsName = ['setCookie'];

      functionsName.forEach(name => {
        expect(Response[name]).to.be.a('function');
      });
    });

  });

});