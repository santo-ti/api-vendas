import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { celebrator, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const productRouter = Router();
const controller = new ProductController();
const celebrate = celebrator({ reqContext: true }, { convert: false });

productRouter.use(isAuthenticated);

productRouter.get('/', controller.index);

productRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.show,
);

productRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).positive().required(),
      quantity: Joi.number().integer().positive().required(),
    },
  }),
  controller.create,
);

productRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).positive().required(),
      quantity: Joi.number().integer().positive().required(),
    },
  }),
  controller.update,
);

productRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.delete,
);

export default productRouter;
