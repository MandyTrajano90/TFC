import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';
import { teamsMatchesMock, leaderboardMock } from './mocks/leaderboard.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  it('should return a leaderboard', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMatchesMock as any);
    const res = await chai.request(app).get('/leaderboard/home');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(leaderboardMock);
  });
});