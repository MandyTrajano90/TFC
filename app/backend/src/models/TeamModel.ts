import { ITeams } from '../Interfaces/ITeams';
import { ITeamModel } from '../Interfaces/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';

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

  async getTeams() {
    const teamsDB = await this.team.findAll({
      include: [
        {
          model: SequelizeMatch,
          as: 'homeTeam',
          where: { inProgress: false },
        },
        {
          model: SequelizeMatch,
          as: 'awayTeam',
          where: { inProgress: false },
        },
      ],
    });
    return teamsDB;
  }
}
