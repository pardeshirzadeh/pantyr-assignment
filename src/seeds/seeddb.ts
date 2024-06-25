import mongoose from "mongoose";
import 'dotenv/config';
import validateEnv from "../utils/validations/validateEnv.validation";
validateEnv();
import { ProductModel } from "../resources/product/product.model";
import productSeed from "./product";
import { CounterModel } from "../utils/model/couter.model";


const {MONGO_DB_USER,MONGO_DB_PASSWORD,MONGO_DB_PATH} = process.env;


const seedDatabase = async () => {
    try{
        mongoose.connect(
            `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}${MONGO_DB_PATH}`
        ).then(()=>{
            console.log("connected to database!!");
        });
        
        await CounterModel.deleteMany({ _id: 'ProductId' });
        await CounterModel.create({ _id: 'ProductId', seq: productSeed.length });
        await CounterModel.create({ _id: 'OrderId', seq: 0 });
        await ProductModel.insertMany(productSeed);
        console.log("database seeded!!"); 
    }catch(error){
        console.error('Failed to connect to MongoDB', error);
    }finally{
        await mongoose.disconnect();
    }

}
seedDatabase();