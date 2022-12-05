import ProductsRepository from '@repositories/ProductsRepository';
import { Product } from '@entities/Product';
import { getCustomRepository } from 'typeorm';

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const repository = getCustomRepository(ProductsRepository);

    return await repository.find();
  }
}
