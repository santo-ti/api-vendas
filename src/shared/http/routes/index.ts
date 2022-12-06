import { Router } from 'express';
import productRouter from '@modules/products/routes';
import userRouter from '@modules/users/routes';
import passwordRouter from '@modules/passwords/routes';
import sessionRouter from '@modules/sessions/routes';
import profileRouter from '@modules/profiles/routes';
import customerRouter from '@modules/customers/routes';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'OK' });
});

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/passwords', passwordRouter);
routes.use('/profiles', profileRouter);
routes.use('/customers', customerRouter);

export default routes;
