import mongoosePaginate from 'mongoose-paginate-v2';
import {v4 as uuidv4} from 'uuid';
import mongoose from 'mongoose';

const collection = 'tickets';

const generatePurchaseDatetime = () => {
    return new Date();
};

const ticketSchema = new mongoose.Schema({
    code:{
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    purchase_dateTime:{
        type: Date,
        default: generatePurchaseDatetime
    },
    amount:{
        type: Number,
        required: true
    },
    purchaser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

ticketSchema.plugin(mongoosePaginate);
ticketSchema.virtual('purchaserEmail', {
    ref: 'users',
    localField: 'purchaser',
    foreignField: '_id',
    justOne: true
});
ticketSchema.set('toObject', { virtuals: true });
ticketSchema.set('toJSON', { virtuals: true });
const ticketModel = mongoose.model(collection, ticketSchema);
export default ticketModel;