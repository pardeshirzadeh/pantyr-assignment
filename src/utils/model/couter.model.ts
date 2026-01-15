import { Schema, model, Document } from 'mongoose';

export interface Counter extends Document {
  _id: string;
  seq: number;
}

const counterSchema = new Schema<Counter>({
  _id: { type: String, required: true },
  seq: { type: Number, required: true }
});

export const CounterModel = model<Counter>('Counter', counterSchema);
