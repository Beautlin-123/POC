const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const cartSchema=Schema({

    _cartId:Schema.Types.ObjectId,
    userId: { type: Number, default: 1 },
    productId: { type: Schema.Types.ObjectId, required: true },
    cartStatus: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }  
});
module.exports=mongoose.model("cart",cartSchema)

