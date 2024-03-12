import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatchModel } from '../Interfaces/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { INewMatch } from '../Interfaces/IMatch';

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

  async updateScore(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const [match] = await this.match.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return match;
  }

  async findById(id: number) {
    const match = await this.match.findByPk(id);
    if (match === null) return null;
    return match;
  }

  async createMatch(data: INewMatch) {
    const match = await this.match.create({ ...data, inProgress: true });
    const { homeTeamId, awayTeamId, id, homeTeamGoals, awayTeamGoals, inProgress } = match;
    return { homeTeamId, awayTeamId, id, homeTeamGoals, awayTeamGoals, inProgress };
  }
}
