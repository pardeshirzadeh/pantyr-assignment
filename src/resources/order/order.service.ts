import { IOrder } from './order.interface';
import OrderRepository from './order.respository';


class OrderService {
    private orderRepository = new OrderRepository();

    public async create(
        oder: IOrder
    ): Promise<IOrder> {
        try {
            const newoder = await this.orderRepository.create(oder)

            return newoder.populate("products");
        } catch (error: any) {
            throw new Error(`Error unable to create the oder: ${error}`);
        }
    }

    public async findById(
        id: number
    ): Promise<IOrder> {
        try {
            const order = await this.orderRepository.findById(id);
            if (order) {
                await order.populate('products');
                return order;
              } else {
                throw new Error(`oder with id: ${id} not found!`);
              }
        } catch (error: any) {
            throw new Error(`Error fetching order: ${error.message}`);
        }
    }

    public async findAll(
        page: number,
        limit: number
    ): Promise<IOrder[]> {
        try {
            const orders = await this.orderRepository.findAll(page, limit);
            const populatedOrders = await Promise.all(
                orders.map(order => order.populate('products'))
              );
            return populatedOrders;
        } catch (error:any) {
            throw new Error(`Error unable to get the oders: ${error.message}`);
        }
    }
}
export default OrderService;