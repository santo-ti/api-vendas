import ProductRepository from '@repositories/ProductRepository';
import AppError from '@shared/errors/AppError';
import { Product } from '@entities/Product';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError(`Product '${name}' already exists.`);
    }

    return await productRepository.createAndSave(name, price, quantity);
  }
}
