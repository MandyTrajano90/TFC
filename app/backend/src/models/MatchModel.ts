import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatchModel } from '../Interfaces/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel {
  private match = SequelizeMatch;

  async findAll(q: string | undefined) {
    const condition = q !== undefined ? { inProgress: q === 'true' } : {};

    const matchesInProgressData = await this.match.findAll({
      where: condition,
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

  async updateMatch(id: number) {
    const [match] = await this.match.update({ inProgress: false }, { where: { id } });
    return match;
  }
}
