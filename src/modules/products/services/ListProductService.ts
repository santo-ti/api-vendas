import ProductRepository from '@repositories/ProductRepository';
import { Product } from '@entities/Product';
import { getCustomRepository } from 'typeorm';
import RedisCache from '@shared/cache/RedisCache';

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const repository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    const productsRedis = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    if (!productsRedis) {
      const products = await repository.find();

      await redisCache.save('api-vendas-PRODUCT_LIST', products);

      return products;
    }

    return productsRedis;
  }
}
