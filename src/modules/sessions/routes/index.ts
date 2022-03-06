import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrator, Joi, Segments } from 'celebrate';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const celebrate = celebrator({ reqContext: true }, { convert: false });

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().length(4).required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
