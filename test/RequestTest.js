const chai = require('chai');
const sinon = require('sinon');
const request = require('../src/request/RequestServiceProvider');
const expect = chai.expect;

const fakeExpressRequest =  {
  headers: {},
  cookies: {},
};

describe('Request', () => {

  describe('#headers', () => {
    it('It shoud contains all functions', () => {
      const csrfHeaderName = 'CSRF-TOKEN';

      const headersOptions = {
        bind: {
          getHeader: [
            { name: 'getCsrfHeader', value: 'CSRF-TOKEN' },
          ],
        },
      };

      const requestt = request({ headersOptions: {lol: true} }); // "Instanciate"
      const Request = requestt(fakeExpressRequest);

      const functionsName = ['getHeader'];

      functionsName.forEach(name => {
        expect(Request[name]).to.be.a('function');
      });
    });

    it('It should calls properly', () => {
      const requestt = request({ csrfHeaderName: 'CSRF-TOKEN' }); // "Instanciate"
      fakeExpressRequest.headers['CSRF-TOKEN'] = 'supertoken';
      const Request = requestt(fakeExpressRequest);

      const getHeaderSpy = sinon.spy(Request, 'getHeader');
      const getCsrfHeaderSpy = sinon.spy(Request, 'getCsrfHeader');

      Request.getHeader('headerName');
      Request.getCsrfHeader();

      expect(getHeaderSpy.calledWith('headerName')).to.be.true;
      expect(getCsrfHeaderSpy.calledOnce).to.be.true;
    });

    it('It shouldn\'t contains getCsrfHeader without the csrfHeaderName options', () => {
      const requestt = request({ csrfHeaderName: undefined });
      const Request = requestt(fakeExpressRequest);

      expect(Request['getCsrfHeader']).to.be.undefined;
    });

  });

  describe('#cookies', () => {
    it('It shoud contains all functions', () => {
      const sessionName = 'emixidd';

      const headersOptions = { lol: true };
      
      const requestt = request({ cookiesOptions: { sessionName }, headersOptions }); // "Instanciate"
      const Request = requestt(fakeExpressRequest);

      const functionsName = ['getCookie', 'getSessionCookie'];

      functionsName.forEach(name => {
        expect(Request[name]).to.be.a('function');
      });
    });

    describe.only('#getSessionCookie (short cut for getCookie with name)', () => {

      it.only('It should exists', () => {
        const sessionName = 'emixiddd';
        fakeExpressRequest.cookies[sessionName] = 'supertoken';

        const cookiesOptions = {
          bind: {
            getCookie: [
              { name: 'getSessionCookie', value: sessionName },
            ],
          }
        };

        const requestt = request({ cookiesOptions }); // "Instanciate"
        const Request = requestt(fakeExpressRequest);

        // expect(Request, 'The getSessionCookie property on Request object doesn\'t exist').to.have.property('getSessionCookie').and.to.be.a('function');
        // expect(Request.getSessionCookie()).to.be.equal('supertoken');
      });

    });
  });


});