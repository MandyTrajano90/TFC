import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginValidations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(mapStatusHTTP.badRequest).json({ message: 'All fields must be filled' });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Email and password must be strings' });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (password.length < 6 || !emailRegex.test(email)) {
      return res.status(mapStatusHTTP.unauthorized).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
