import BaseRepository from "../../utils/repository/baseRepository.repository";
import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";

class OrderRepository extends BaseRepository<IOrder>{

    constructor(){
        super(OrderModel);
    }
}
export default OrderRepository;