import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';


chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', function () {
  beforeEach(function () { sinon.restore(); });

  it('should return a list of matches', async function () {
    const matches = [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 2,
        "homeTeamId": 9,
        "homeTeamGoals": 1,
        "awayTeamId": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      }
    ]

    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matches);
  });

  it('should return a list of matches in progress', async function () {
    const matchesInProgress = [
      {
        "id": 3,
        "homeTeamId": 6,
        "homeTeamGoals": 0,
        "awayTeamId": 4,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Flamengo"
        },
        "awayTeam": {
          "teamName": "Fluminense"
        }
      },
      {
        "id": 4,
        "homeTeamId": 3,
        "homeTeamGoals": 0,
        "awayTeamId": 7,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Corinthians"
        },
        "awayTeam": {
          "teamName": "Vasco"
        }
      }
    ]

    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgress as any);

    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matchesInProgress);
  });
});