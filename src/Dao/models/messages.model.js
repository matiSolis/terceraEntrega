import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    message: {
        type: String,
        require: true
    }
});

schema.virtual('userFirstName', {
    ref: 'users',
    localField: 'user',
    foreignField: '_id',
    justOne: true,
    autopopulate: { select: 'firstName' }
});

schema.plugin(require('mongoose-autopopulate'));
const messagesModel = mongoose.model(collection, schema);
export default messagesModel;