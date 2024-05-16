
const express=require('express');
const router=express.Router();
const cartModelRequest=require('./cart.model');
const multer=require('multer');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage});

router.get("/",cartModelRequest.get_carts);

//post request for cart
router.post("/",upload.single("cartImage"),cartModelRequest.create_cart);
router.post("/",cartModelRequest.create_cart);
//get request for single cart
router.get("/getSinglecart/:cartId",cartModelRequest.get_cart_ById);
router.get("/getCartByStatus/:cartStatus",cartModelRequest.get_cart_ByStatus);
router.delete("/byStatus",cartModelRequest.delete_cartStatus);

//put request for single cart
router.put("/:cartId",cartModelRequest.update_cart); 
//delete request for single cart
router.delete("/:cartId",cartModelRequest.delete_cart); 
    
router.get("/cartItems", cartModelRequest.cart_items_list);
router.get("/countItems",cartModelRequest.count_items_list);
//get request for single cart
router.get("/sigleCart:cartId",(req,res,next)=>{
    res.status(200).json({
        msg:"This is simple get request for single cart"
    });
});
//put request for single cart
router.put("/:cartId",(req,res,next)=>{
    res.status(200).json({
        msg:"This is simple put request for single cart"
    });
});
//delete request for single cart
router.delete("/:cartId",(req,res,next)=>{
    res.status(200).json({
        msg:"This is simple delete request for single cart"
    });
});
module.exports=router;