import ProductsRepository from '@repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository = getCustomRepository(ProductsRepository);

    const entity = await repository.findOne(id);

    if (!entity) {
      throw new AppError(`Product '${id}' not found.`, 404);
    }

    await repository.remove(entity);
  }
}
