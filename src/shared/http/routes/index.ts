import { Router } from 'express';
import productsRouter from '@modules/products/routes';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'OK' });
});

routes.use('/products', productsRouter);

export default routes;
