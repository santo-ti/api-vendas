import { Router } from 'express';
import { celebrator, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const controller = new ProfileController();
const celebrate = celebrator({ reqContext: true }, { convert: false });

profileRouter.use(isAuthenticated);

profileRouter.get('/', controller.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string().valid(Joi.ref('password')).when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      old_password: Joi.string(),
    },
  }),
  controller.update,
);

export default profileRouter;
