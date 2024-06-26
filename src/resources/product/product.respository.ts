import BaseRepository from "../../utils/repository/baseRepository.repository";
import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";

class ProductRepository extends BaseRepository<IProduct>{

    constructor(){
        super(ProductModel);
    }
}
export default ProductRepository;