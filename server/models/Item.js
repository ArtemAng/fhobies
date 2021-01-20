const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    tags: { type: String, required: true },
    name: { type: String, required: true},
    collectionId: {type: Types.ObjectId, required: true},
    likes: {type: Array, required: true},
    
    // items: { type: Types.Array } //requiered
});

module.exports = model('CollectionItem', schema);