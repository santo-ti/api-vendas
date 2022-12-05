import { Router } from 'express';
import productsRouter from '@modules/products/routes';
import usersRouter from '@modules/users/routes';
import sessionsRouter from '@modules/sessions/routes';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'OK' });
});

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
