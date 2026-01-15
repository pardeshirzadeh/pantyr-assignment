import { Document } from "mongoose";

export interface IOrder extends Document{
  _id: number;
  products: number[];
  orderedBy: string;
}
