import ProductRepository from '@repositories/ProductRepository';
import { Product } from '@entities/Product';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const repository = getCustomRepository(ProductRepository);

    const entity = await repository.findOne(id);

    if (!entity) {
      throw new AppError(`Product '${id}' not found.`, 404);
    }

    const entityName = await repository.findByName(name);

    if (entityName && name !== entity.name) {
      throw new AppError(`Product '${name}' already exists.`);
    }

    entity.name = name;
    entity.price = price;
    entity.quantity = quantity;

    // const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return await repository.save(entity);
  }
}
