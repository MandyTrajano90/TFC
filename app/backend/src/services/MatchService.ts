import mapStatusHTTP from '../utils/mapStatusHTTP';
import { IMatchModel } from '../Interfaces/IMatchModel';
import MatchModel from '../models/MatchModel';
import { INewMatch } from '../Interfaces/IMatch';

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
    const updatedMatch = await this.matchModel.findById(id);
    return { status: mapStatusHTTP.ok, data: updatedMatch };
  }

  public async createMatch(data: INewMatch) {
    const { homeTeamId, awayTeamId } = data;
    if (homeTeamId === awayTeamId) {
      return {
        status: mapStatusHTTP.invalidValue,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeam = await this.matchModel.findById(homeTeamId);
    const awayTeam = await this.matchModel.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return {
        status: mapStatusHTTP.notFound,
        data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.createMatch(data);
    return { status: mapStatusHTTP.created, data: newMatch };
  }
}
