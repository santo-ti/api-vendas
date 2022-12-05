import ProductsRepository from '@repositories/ProductsRepository';
import { Product } from '@entities/Product';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const repository = getCustomRepository(ProductsRepository);

    const entity = await repository.findOne(id);

    if (!entity) {
      throw new AppError(`Product '${id}' not found.`, 404);
    }

    return entity;
  }
}
