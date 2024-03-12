import { IMatch, INewMatch } from './IMatch';

export interface IMatchModel {
  findAll(q: string | undefined): Promise<IMatch[]>,
  findById(id: number): Promise<IMatch | null>,
  updateMatch(id: number): Promise<number>,
  updateScore(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number>,
  createMatch(data: INewMatch): Promise<IMatch>,
}
