import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';
import { celebrator, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const userRouter = Router();
const controller = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

const celebrate = celebrator({ reqContext: true }, { convert: false });

userRouter.get('/', isAuthenticated, controller.index);

userRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.show,
);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  controller.create,
);

userRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  controller.update,
);

userRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.delete,
);

userRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), userAvatarController.update);

export default userRouter;
