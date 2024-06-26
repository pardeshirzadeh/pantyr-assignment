import { IBaseRepository } from "../interfaces/repository.interface";
import mongoose from "mongoose";




class BaseRepository<T extends mongoose.Document> implements IBaseRepository<T>{


    private _model = mongoose.Model<T>;
    

    constructor(schemaModel:mongoose.Model<T>){
        this._model = schemaModel;
    }

    public async findById(id: number): Promise<T | null> {
       return this._model.findById(id);

    }
    public async findAll(page:number,limit:number): Promise<T[]> {
        const skip:number = (page - 1 ) * limit;
        return  this._model.find({}).skip(skip).limit(limit);


    
    }
    public async create(entity: T): Promise<T> {
        return this._model.create(entity);

    }
    public async update(id: string, entity:Partial<T>): Promise<T|null> {
        return this._model.findByIdAndUpdate(id,entity,{new:true});

    }
    public async delete(id: string): Promise<T|null> {
        return this._model.findByIdAndDelete(id);
    }

}

export default BaseRepository;