import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { Order } from '@entities/Order';
import OrderRepository from '@repositories/OrderRepository';
import CustomerRepository from '@repositories/CustomerRepository';
import ProductRepository from '@repositories/ProductRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productRepository = getCustomRepository(ProductRepository);

    const customerExists = await customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not found any customer with the given id.', 404);
    }

    const existsProducts = await productRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not found any products with the given ids.', 404);
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(product => !existsProductsIds.includes(product.id));

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not found product '${checkInexistentProducts[0].id}'.`, 404);
    }

    const quantityAvailable = products.filter(
      product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for '${quantityAvailable[0].id}'.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await orderRepository.createAndSave({
      customer: customerExists,
      products: serializedProducts,
    });

    const { orderProducts } = order;

    const updatedProductQuantity = orderProducts.map(orderProduct => ({
      id: orderProduct.product_id,
      quantity: existsProducts.filter(p => p.id === orderProduct.product_id)[0].quantity - orderProduct.quantity,
    }));

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}
