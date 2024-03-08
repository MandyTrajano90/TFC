import { ITeams } from '../Interfaces/ITeams';
import { ITeamModel } from '../Interfaces/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private team = SequelizeTeam;

  async findAll() {
    const teamsDB = await this.team.findAll();
    return teamsDB;
  }

  async findById(id: ITeams['id']) {
    const teamDB = await this.team.findByPk(id);
    if (teamDB === null) return null;
    return teamDB;
  }
}
