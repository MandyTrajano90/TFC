import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../Interfaces/ITeamModel';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) {}

  public async findAllTeams() {
    const allTeams = await this.teamModel.findAll();
    return { status: 200, data: allTeams };
  }
}
