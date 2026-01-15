import { str,port, cleanEnv } from "envalid";

export default function validateEnv():void{
    cleanEnv(process.env,{
        MONGO_DB_USER:str(),
        MONGO_DB_PASSWORD:str(),
        MONGO_DB_PATH:str(),
        PORT:port({
            default:3000
        })
    })
}