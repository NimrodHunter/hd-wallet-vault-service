const {createAccount, __setAddress__, __willFail__} = require('../../../services/keyvault');
const supertest = require('supertest');
const api = require('../../../api');

jest.unmock('azure-keyvault');
jest.mock('../../../services/keyvault');

describe('controllers/account', () => {
  let request;
  beforeAll(() => {
    request = supertest(api);
  });

  beforeEach(() => {
    createAccount.mockClear();
  });

  describe('[POST] /account', () => {
    it ('should return the address', async () => {
      const address = '1010101010101010';
      __setAddress__(address);
      const response = await request
        .post('/account')
        .send({ keyId: 'test'});
      
      const {statusCode, body} = response;

      const expected = `0x${address}`;
      expect(createAccount).toHaveBeenCalledTimes(1);
      expect(createAccount).toHaveBeenCalledWith('test');
      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('address', expected);
    });

    it ('should fail', async () => {
      __willFail__();
      const response = await request
        .post('/account')
        .send({ keyId: 'test '});
      
      const { statusCode, body } = response;

      expect(statusCode).toBe(500);
      expect(body).toHaveProperty('error', 'Failed to create key');
    });
  });
});
