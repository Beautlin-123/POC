const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const voucherSchema=Schema({
    _id:Schema.Types.ObjectId,
    discountCode:{type:String,require:true},
    discountAmount:{type:String,require:true}
});
module.exports=mongoose.model("Voucher",voucherSchema)