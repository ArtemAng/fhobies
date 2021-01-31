const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    userName: { type: String, required: true },
    // collectionName: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    categoryId: { type: Types.ObjectId, ref: 'Category', required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    customProps: { type: Object}
});

module.exports = model('Collection', schema);