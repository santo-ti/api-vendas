import ProductsRepository from '@repositories/ProductsRepository';
import { Product } from '@entities/Product';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const repository = getCustomRepository(ProductsRepository);

    const entity = await repository.findOne(id);

    if (!entity) {
      throw new AppError(`Product '${id}' not found.`, 404);
    }

    const productNameExists = await repository.findByName(name);

    if (productNameExists && name !== entity.name) {
      throw new AppError(`Product '${name}' already exists.`);
    }

    entity.name = name;
    entity.price = price;
    entity.quantity = quantity;

    return await repository.save(entity);
  }
}
