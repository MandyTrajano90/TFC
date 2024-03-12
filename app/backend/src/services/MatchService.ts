import mapStatusHTTP from '../utils/mapStatusHTTP';
import { IMatchModel } from '../Interfaces/IMatchModel';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public async getAllMatches(query: string | undefined) {
    const allMatches = await this.matchModel.findAll(query);
    return { status: mapStatusHTTP.ok, data: allMatches };
  }

  public async toggleInProgressMatch(id: number) {
    await this.matchModel.updateMatch(id);
    return { status: mapStatusHTTP.ok, data: { message: 'Finished' } };
  }

  public async updateMatchScore(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.matchModel.updateScore(id, homeTeamGoals, awayTeamGoals);
    return { status: mapStatusHTTP.ok, data: { message: 'OK' } };
  }
}
