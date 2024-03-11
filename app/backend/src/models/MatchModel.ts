import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatchModel } from '../Interfaces/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel {
  private match = SequelizeMatch;

  async findAll() {
    const matchesDbData = await this.match.findAll({
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matchesDbData;
  }

  async filteredMatches(filter: boolean) {
    const matchesInProgressData = await this.match.findAll({
      where: {
        inProgress: filter,
      },
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matchesInProgressData;
  }
}
