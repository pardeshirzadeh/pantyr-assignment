import { Schema, model} from 'mongoose';
import { CounterModel } from '../../utils/model/couter.model';
import { IProduct } from './product.interface';



const ProductSchema = new Schema<IProduct>({
  _id: { type: Number },
  title: { type: String, required: true },
  price: { type: Number, required: true }
},
{
    versionKey: false,
    id: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
});

ProductSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await CounterModel.findByIdAndUpdate(
      { _id: 'ProductId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this._id = counter.seq;
  }
  next();
});

export const ProductModel = model<IProduct>('Product', ProductSchema);
