import ProductRepository from '@repositories/ProductRepository';
import { Product } from '@entities/Product';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const repository = getCustomRepository(ProductRepository);
    const entity = await repository.findByName(name);

    if (entity) {
      throw new AppError(`Product '${name}' already exists.`);
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return await repository.createAndSave(name, price, quantity);
  }
}
