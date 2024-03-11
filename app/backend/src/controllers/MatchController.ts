import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService: MatchService = new MatchService()) {}

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress !== undefined) {
      const { status, data } = await this.matchService.getFilteredMatches(inProgress === 'true');
      return res.status(status).json(data);
    }
    const { status, data } = await this.matchService
      .getAllMatches();
    return res.status(status).json(data);
  };
}
