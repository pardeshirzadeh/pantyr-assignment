import { Document } from "mongoose";

export interface IProduct extends Document{
    _id: number;
    title: string;
    price: number;
}