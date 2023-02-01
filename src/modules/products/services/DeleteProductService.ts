import ProductRepository from '@repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository = getCustomRepository(ProductRepository);

    const entity = await repository.findOne(id);

    if (!entity) {
      throw new AppError(`Product '${id}' not found.`, 404);
    }

    // const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await repository.remove(entity);
  }
}
