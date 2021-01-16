const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    // userName: { type: String, required: true },
    collectionName: {type: String, required: true},
    // items: { type: Types.Array } //requiered
});

module.exports = model('Collection', schema);