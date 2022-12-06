import ProductRepository from '@repositories/ProductRepository';
import { Product } from '@entities/Product';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

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

    return await repository.createAndSave(name, price, quantity);
  }
}
