import ProductRepository from '@repositories/ProductRepository';
import { Product } from '@entities/Product';
import { getCustomRepository } from 'typeorm';

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    return await productRepository.find();
  }
}
