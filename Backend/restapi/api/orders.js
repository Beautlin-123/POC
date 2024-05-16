const express=require('express');
const router=express.Router();
const orderModelRequest=require('./order.model')

//get request for single product
router.get("/:orderId",orderModelRequest.get_order_ById);
//delete request for single product
router.delete("/:orderId",orderModelRequest.delete_order); 
//get request for order
router.get("/",orderModelRequest.get_orders);
// router.get("/",(req,res,next)=>{
//     res.status(200).json({
//         msg:"This is simple get request for order"
//     });
// });
//post request for order
router.post("/",orderModelRequest.create_order)
// router.post("/",(req,res,next)=>{
//     // res.status(200).json({
//     //     msg:"This is simple post request for order"
//     // });
    
    
// });
//get request for single order
router.get("/:orderId",(req,res,next)=>{
    res.status(200).json({
        msg:"This is simple get request for single order"
    });
});

//delete request for single product
router.delete("/:orderId",(req,res,next)=>{
    res.status(200).json({
        msg:"This is simple delete request for single order"
    });
});
module.exports=router;