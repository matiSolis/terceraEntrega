import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const collection = 'messages';

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
    autopopulate: { select: 'first_name' }
});

schema.plugin(autopopulate);
const messagesModel = mongoose.model(collection, schema);
export default messagesModel;
