const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    itemId: { type: Types.ObjectId, ref: 'Item', required: true }
});

module.exports = model('Comment', schema);