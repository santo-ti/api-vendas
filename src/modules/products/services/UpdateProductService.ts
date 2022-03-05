import ProductRepository from '@shared/typeorm/repositories/ProductRepository';
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
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError(`Product '${id}' not found.`, 404);
    }

    const productExists = await productRepository.findByNameAndId(name, id);

    if (productExists) {
      throw new AppError(`Product '${name}' already exists.`);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    return await productRepository.save(product);
  }
}
