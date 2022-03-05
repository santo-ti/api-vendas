import { EntityRepository, Repository } from 'typeorm';
import { Product } from '@entities/Product';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  public async findByNameAndId(name: string, id: string): Promise<Product | undefined> {
    const entity = this.findOne({
      where: {
        id,
        name,
      },
    });

    return entity;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    return this.findOne({ name });
  }

  public async createAndSave(name: string, price: number, quantity: number) {
    const entity = this.create({
      name,
      price,
      quantity,
    });

    return this.save(entity);
  }
}
