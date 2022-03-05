import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const serviceProduct = new ListProductService();

    const listProducts = await serviceProduct.execute();

    return response.json(listProducts);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const serviceProduct = new ShowProductService();

    const product = await serviceProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const serviceProduct = new CreateProductService();

    const product = await serviceProduct.execute({ name, price, quantity });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const serviceProduct = new UpdateProductService();

    const product = await serviceProduct.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const serviceProduct = new DeleteProductService();

    const product = await serviceProduct.execute({ id });

    return response.json(product);
  }
}
