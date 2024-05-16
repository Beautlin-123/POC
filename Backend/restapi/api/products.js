const express=require('express');
const router=express.Router();
const productModelRequest=require('../api/product.model');
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

router.get("/",productModelRequest.get_products);

//post request for product
// router.post("/",upload.single("productImage"),productModelRequest.create_product);
router.post("/",productModelRequest.create_product);
//get request for single product
router.get("/:productId",productModelRequest.get_product_ById);
//put request for single product
router.put("/:productId",productModelRequest.update_product); 
//delete request for single product
router.delete("/:productId",productModelRequest.delete_product); 
    

//get request for single product
router.get("/:productId",(req,res,next)=>{
    res.status(200).json({
        msg:"This is simple get request for single product"
    });
});
//put request for single product
router.put("/:productId",(req,res,next)=>{
    res.status(200).json({
        msg:"This is simple put request for single product"
    });
});
//delete request for single product
router.delete("/:productId",(req,res,next)=>{
    res.status(200).json({
        msg:"This is simple delete request for single product"
    });
});
module.exports=router;