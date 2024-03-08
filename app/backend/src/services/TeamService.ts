import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../Interfaces/ITeamModel';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) {}

  public async findAllTeams() {
    const allTeams = await this.teamModel.findAll();
    return { status: 200, data: allTeams };
  }

  public async findTeamById(id: number) {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: mapStatusHTTP.notFound, data: { message: 'Team not found' } };
    return { status: mapStatusHTTP.ok, data: team };
  }
}
