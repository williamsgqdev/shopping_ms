const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    customerId: { type: String },
    items: [
        {
            product: {
                _id: { type: String, required: true },
                name: { type: String },
                desc: { type: String },
                type: { type: String },
                unit: { type: Number },
                supplier: { type: String },
                banner: { type: String },
                available: { type: Boolean },
                price: { type: Number }
            },
            unit: { type: Number, required: true }
        }
    ]
},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
            }
        },
        timestamps: true
    });

module.exports = mongoose.model('cart', CartSchema);