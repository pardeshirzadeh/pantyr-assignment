import 'dotenv/config';
import App from "./app";
import validateEnv from "./utils/validations/validateEnv.validation";
import ProductController from "./resources/product/product.controller";
import OrderController from './resources/order/order.controller';


validateEnv();

const app = new App([new ProductController,new OrderController],Number(process.env.PORT));

app.listen();