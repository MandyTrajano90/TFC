import { ITeamModel } from '../Interfaces/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private team = SequelizeTeam;

  async findAll() {
    const teamsDB = await this.team.findAll();
    return teamsDB;
  }
}
