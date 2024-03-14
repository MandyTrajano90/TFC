import TeamModel from '../models/TeamModel';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { IMatch } from '../Interfaces/IMatch';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import SequelizeTeam from '../database/models/SequelizeTeam';

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

  private calculateAddStats(totalGames: number, totalPoints: number) {
    const goalsBalance = this.goalsScored - this.goalsOwn;
    const efficiency = (totalPoints / (totalGames * 3)) * 100;

    return { goalsBalance, efficiency: efficiency.toFixed(2) };
  }

  private sortLeaderboard = (leaderboard: ILeaderboard[]) => leaderboard.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });

  private initializeStats() {
    this.goalsScored = 0;
    this.goalsOwn = 0;
    this.victories = 0;
    this.draws = 0;
    this.losses = 0;
  }

  private calculateTeamStats(team: SequelizeTeam) {
    this.initializeStats();

    team.homeTeam?.forEach((match: IMatch) => this.calculatePoints(match));

    const totalGames = this.victories + this.draws + this.losses;
    const totalPoints = this.victories * 3 + this.draws;
    const { goalsBalance, efficiency } = this.calculateAddStats(totalGames, totalPoints);

    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories: this.victories,
      totalDraws: this.draws,
      totalLosses: this.losses,
      goalsFavor: this.goalsScored,
      goalsOwn: this.goalsOwn,
      goalsBalance,
      efficiency,
    };
  }

  public async getLeaderboard() {
    const teams = await this.leaderboardModel.getTeams();
    const leaderboard = teams.map((team) => this.calculateTeamStats(team));
    return { status: mapStatusHTTP.ok, data: this.sortLeaderboard(leaderboard) };
  }
}
