import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import LoginValidations from '../middlewares/LoginValidations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req, res) => matchController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  LoginValidations.validateToken,
  (req, res) => matchController.toggleInProgressMatch(req, res),
);

export default router;
