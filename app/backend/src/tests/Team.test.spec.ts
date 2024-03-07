import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';


chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', function () {
  beforeEach(function () { sinon.restore(); });

  it('should return a list of teams', async function () {
    const teams = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
    ];
    const teamsStub = SequelizeTeam.bulkBuild(teams);
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamsStub);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(teams);
  });
});
