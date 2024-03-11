import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService: MatchService = new MatchService()) {}

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const { status, data } = await this.matchService
      .getAllMatches(inProgress as string | undefined);
    return res.status(status).json(data);
  };

  public toggleInProgressMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data } = await this.matchService.toggleInProgressMatch(Number(id));
    return res.status(status).json(data);
  };
}
