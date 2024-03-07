import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAllTeams(_req: Request, res: Response) {
    const serviceRes = await this.teamService.findAllTeams();
    return res.status(serviceRes.status).json(serviceRes.data);
  }
}
