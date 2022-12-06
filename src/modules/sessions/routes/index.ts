import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import { celebrator, Joi, Segments } from 'celebrate';

const sessionRouter = Router();
const controller = new SessionController();
const celebrate = celebrator({ reqContext: true }, { convert: false });

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  controller.create,
);

export default sessionRouter;
