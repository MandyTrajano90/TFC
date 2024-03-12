import TeamModel from '../models/TeamModel';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { IMatch } from '../Interfaces/IMatch';

export default class LeaderboardService {
  private goalsScored = 0;
  private goalsOwn = 0;
  private victories = 0;
  private draws = 0;
  private losses = 0;

  constructor(
    private leaderboardModel = new TeamModel(),
  ) {}

  private calculatePoints(match: IMatch) {
    const matchGoalsScored = match.homeTeamGoals;
    const matchGoalsOwn = match.awayTeamGoals;

    let matchVictories = 0;
    let matchDraws = 0;
    let matchLosses = 0;

    if (match.homeTeamGoals > match.awayTeamGoals) {
      matchVictories += 1;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      matchDraws += 1;
    } else {
      matchLosses += 1;
    }
    this.goalsScored += matchGoalsScored;
    this.goalsOwn += matchGoalsOwn;
    this.victories += matchVictories;
    this.draws += matchDraws;
    this.losses += matchLosses;
  }

  public async getLeaderboard() {
    const teams = await this.leaderboardModel.getTeams();
    const leaderboard = teams.map((team) => {
      team.homeTeam?.forEach((match) => this.calculatePoints(match));
      const totalGames = this.victories + this.draws + this.losses;
      const totalPoints = this.victories * 3 + this.draws;
      return {
        name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories: this.victories,
        totalDraws: this.draws,
        totalLosses: this.losses,
        goalsFavor: this.goalsScored,
        goalsOwn: this.goalsOwn,
      };
    });
    return { status: mapStatusHTTP.ok, data: leaderboard };
  }
}
