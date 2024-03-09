import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import JWT from '../utils/JWT';
import LoginValidations from '../middlewares/LoginValidations';
import { validLogin, userRegistered } from './mocks/user.mocks';


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

  // it('valid login', async function () {
  //   sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
  //   sinon.stub(JWT, 'sign').resolves('validToken');

  //   const response = await chai.request(app).post('/login').send(validLogin);

  //   expect(response.status).to.equal(200);
  //   expect(response.body).to.have.key('token');
  // });
  // afterEach(sinon.restore);
});
