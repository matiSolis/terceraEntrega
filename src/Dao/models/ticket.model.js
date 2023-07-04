import mongoosePaginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';
import userModel from './user.model.js';

const collection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_dateTime: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "users"
        type: String,
        required: true
    }
});

ticketSchema.plugin(mongoosePaginate);

// ticketSchema.virtual('purchaserEmail', {
//     ref: 'users',
//     localField: 'purchaser',
//     foreignField: '_id',
//     justOne: true,
//     select: 'email'
// });

// ticketSchema.set('toObject', { virtuals: true });
// ticketSchema.set('toJSON', { virtuals: true });

const ticketModel = mongoose.model(collection, ticketSchema);

export default ticketModel;
