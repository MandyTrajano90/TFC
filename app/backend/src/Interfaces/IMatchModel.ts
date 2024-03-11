import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(q: string | undefined): Promise<IMatch[]>,
  updateMatch(id: number): Promise<number>,
}
