import { Schema, model, Document } from 'mongoose';
import { CounterModel } from '../../utils/model/couter.model';
import { IOrder } from './order.interface';



const OrderSchema = new Schema<IOrder>({
    _id: { 
        type: Number 
    },
    products: { 
        type: [{
            type:Number,
            ref:"Product"}],
        required: true
    },
    orderedBy: { 
        type: String, 
        required: true 
    }
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

OrderSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await CounterModel.findByIdAndUpdate(
            { _id: 'OrderId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this._id = counter.seq;
    }
    next();
});

export const OrderModel = model<IOrder>('Order', OrderSchema);
