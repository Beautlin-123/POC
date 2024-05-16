const mongoose = require('mongoose');
const Order = require('./orderModel');
 
// code for creating  order
exports.create_order = async (req,res,next)=>{
     try{
     
        const orderObj = new Order({
            _id:new mongoose.Types.ObjectId(),
            product: req.body.productId,
            quantity: req.body.quantity
        });
        const data = await orderObj.save();
        res.status(200).json({
            code:1,
            message:"order created successfully",
            data:data,
            error:null
        })
     }catch(error){
        res.status(500).json({
            code:0,
            message:"Somthing went wrong",
            data:null,
            error:error
        })
     }
}
 //code for getting order list
exports.get_orders=async(req,res,next)=>{
    try{
        const data=await Order.find();
        if(data){
            res.status(200).json({
            code:1,
            msg:"This is get request for order",
            data:data,
            error:null
            });
        }else{
            res.status(200).json({
                code:1,
                msg:"No data available",
                data:null,
                error:null
            });

        }

    }catch(error){
        res.status(500).json({
            code:0,
            msg:"something went wrong",
            data:null,
            error:error
        });
        
    }
}
// code for getting single order
exports.get_order_ById = async (req,res,next)=>{
    try{
                const data = await Order.findById(req.params.orderId);
                if(data){
                   res.status(200).json({
                    code:1,
                    message:"This is simple get request for single order",
                    data:data,
                    error:null
                   });
                }else{
                    res.status(200).json({
                        code:1,
                        message:"no order is available with given id",
                        data:null,
                        error:null
                    });
                }
    }catch(error){
        res.status(500).json({
            code:0,
            message:"Somthing went wrong",
            data:null,
            error:error
        })
    }
}
exports.delete_order=async (req,res,next)=>{
    try{
       const data= await Order.findByIdAndDelete(req.params.orderId);
       if(!data){
        res.status(404).json({
            code:1,
            message:"no order found",
            data:data,
            error:null
        })
       }else{
        res.status(404).json({
            code:1,
            message:"delete request perform successfully",
            data:data,
            error:null
        })

       }

    }catch(error){
        res.status(500).json({
            code:0,
            message:"something went wrong",
            data:null,
            error:error
        })

    }
}