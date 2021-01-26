const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    // userId: { type: Types.ObjectId, ref: 'User', required: true },
    props: { type: Array, required: true}
});

module.exports = model('Category', schema);