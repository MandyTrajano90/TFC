import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import JWT from '../utils/JWT';
import LoginValidations from '../middlewares/LoginValidations';
import { loginMock } from './mocks/user.mocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', function () {
  beforeEach(function () { sinon.restore(); });

  it('invalid login', async function () {
    const invalidLogin =
    {
      "id": 3,
      "username": "amanda",
      "role": "nada",
      "email": "string",
      "password": "string",
    }

    const loginStub = SequelizeUser.build(invalidLogin);
    sinon.stub(SequelizeUser, 'findOne').resolves(loginStub);

    const response = await chai.request(app).get('/login');

    expect(response.status).to.equal(404);
  });

  // it('should return a token', async function () {
  //   const loginStub = SequelizeUser.build(loginMock);
  //   sinon.stub(SequelizeUser, 'findOne').resolves(loginStub);

  //   const httpRequestBody = {
  //     email: 'admin@admin.com',
  //     password: 'secret_admin'
  //   };

  //   const response = await chai.request(app).post('/login').send(httpRequestBody);

  //   expect(response.status).to.equal(200);
  //   expect(response.body).to.have.property('token');
  // });
  it('should return bad request without email', async function () {
    const httpRequestBody = {
      password: 'secrets_admin'
    };

    const response = await chai.request(app).post('/login').send(httpRequestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return bad request without password', async function () {
    const httpRequestBody = {
      email: 'admin@admin.com'
    };

    const response = await chai.request(app).post('/login').send(httpRequestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return unauthorized without an existing email', async function () {
    const httpRequestBody = {
      email: 'admin@admin.com',
      password: 'secret_admin'
    };
    const response = await chai.request(app).post('/login').send(httpRequestBody);

    expect(response.status).to.equal(500);
    expect(response.body).to.have.property('message');
  });
});
