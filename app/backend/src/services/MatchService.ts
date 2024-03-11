import mapStatusHTTP from '../utils/mapStatusHTTP';
import { IMatchModel } from '../Interfaces/IMatchModel';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public async getAllMatches() {
    const allMatches = await this.matchModel.findAll();
    return { status: mapStatusHTTP.ok, data: allMatches };
  }

  public async getFilteredMatches(filter: boolean) {
    const filteredMatches = await this.matchModel.filteredMatches(filter);
    return { status: mapStatusHTTP.ok, data: filteredMatches };
  }
}
