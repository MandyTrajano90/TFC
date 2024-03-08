import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAllTeams(_req: Request, res: Response) {
    const serviceRes = await this.teamService.findAllTeams();
    return res.status(serviceRes.status).json(serviceRes.data);
  }

  public async getTeamById(_req: Request, res: Response) {
    const { id } = _req.params;
    const serviceRes = await this.teamService.findTeamById(Number(id));
    return res.status(serviceRes.status).json(serviceRes.data);
  }
}
