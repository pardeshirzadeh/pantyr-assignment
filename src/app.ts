import express, {Application} from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import IConteroller from './utils/interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import helmet from 'helmet';



class App{
    public express: Application;
    public port:number
    constructor(controllers:IConteroller[],port:number){
        this.express = express();
        this.port = port
        
        this.initDbConnection();
        this.initMiddleware();
        this.initControllers(controllers);
        this.initErrorHandling();
    }


    private initDbConnection() {
        const {MONGO_DB_USER,MONGO_DB_PASSWORD,MONGO_DB_PATH} = process.env;
        mongoose.connect(
            `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}${MONGO_DB_PATH}`
        ).then(()=>{
            console.log("connected to database!!");
        }).catch(err =>{
            console.error('Failed to connect to MongoDB', err);
        })
    }

    public listen():void{
        this.express.listen(this.port,()=>{
            console.log(`App is listening on port: ${this.port}`);
        });
    }


    private initMiddleware():void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended:false}));
        this.express.use(compression());
    }

    private initControllers(controllers: IConteroller[]): void{
        controllers.forEach((controller:IConteroller)=>{
            this.express.use('/api/v1',controller.router);
        });
    }

    private initErrorHandling():void {
        this.express.use(errorMiddleware);
    }
}
export default App;