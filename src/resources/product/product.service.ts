import { IProduct } from "./product.interface";
import ProductRepository from "./product.respository";


class ProductService{
    private productRepository = new ProductRepository();

    public async create(
        product:IProduct
    ): Promise<IProduct>{
        try {
            const newProduct = await this.productRepository.create(product)

            return newProduct;
        } catch (error:any) {
            throw new Error(`Unable to create product`);
        }
    }

    public async findById(
        id:number
    ): Promise<IProduct|null>{
        try {
            const product = await this.productRepository.findById(id);
            if (product) {
                return product;
            }else{
                throw new Error(`Product with id: ${id} not found!`);
            }
   
        } catch (error:any) {
            throw new Error(`Error fetching product: ${error.message}`);
        }
    }

    public async findAll(
        page:number,
        limit:number
    ): Promise<IProduct[]>{
        try {
            const producten = await this.productRepository.findAll(page,limit);

            return producten;
        } catch (error) {
            throw new Error(`Unable to get the products`);
        }
    }
}
export default ProductService;