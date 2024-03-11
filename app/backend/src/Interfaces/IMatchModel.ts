import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  filteredMatches(filter: boolean): Promise<IMatch[]>,
}
