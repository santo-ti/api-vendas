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
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError(`Product '${id}' not found.`, 404);
    }

    const productNameExists = await productsRepository.findByName(name);

    if (productNameExists && name !== product.name) {
      throw new AppError(`Product '${name}' already exists.`);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    return await productsRepository.save(product);
  }
}
