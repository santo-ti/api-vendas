import { Router } from 'express';
import { celebrator, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import OrderController from '../controllers/OrderController';

const orderRouter = Router();
const controller = new OrderController();
const celebrate = celebrator({ reqContext: true }, { convert: false });

orderRouter.use(isAuthenticated);

orderRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.show,
);

orderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.array().required(),
    },
  }),
  controller.create,
);

export default orderRouter;
