import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService: MatchService = new MatchService()) {}

  public getAllMatches = async (_req: Request, res: Response) => {
    const response = await this.matchService.getAllMatches();
    res.status(response.status).json(response.data);
  };
}
