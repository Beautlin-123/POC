const express=require('express');
const router=express.Router();
const voucherModelRequest=require('../api/voucher.model');

router.get("/",voucherModelRequest.get_vouchers);
router.post("/",voucherModelRequest.create_voucher);
router.get("/discountCode/:voucherDiscount", voucherModelRequest.get_user_ByDiscount);
router.get("/discountAmount/:voucherAmount", voucherModelRequest.get_user_ByAmount);

module.exports=router;