const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    userName: { type: String, required: true },
    // collectionName: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    // collectionId: { type: Types.ObjectId, ref: 'Collection', required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
});

module.exports = model('Collection', schema);