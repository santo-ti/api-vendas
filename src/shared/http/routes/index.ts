import { Router } from 'express';
import productsRouter from '@modules/products/routes';
import usersRouter from '@modules/users/routes';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'OK' });
});

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export default routes;
