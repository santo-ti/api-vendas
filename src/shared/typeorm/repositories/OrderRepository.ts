import { EntityRepository, Repository } from 'typeorm';
import { Order } from '@entities/Order';
import { Customer } from '@entities/Customer';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    return this.findOne(id, {
      relations: ['orderProducts', 'customer'],
    });
  }

  public async createAndSave({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      orderProducts: products,
    });

    return await this.save(order);
  }
}
