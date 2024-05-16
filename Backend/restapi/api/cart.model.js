const mongoose=require('mongoose');
const Cart=require('./cartModel');


exports.create_cart=async(req,res,next)=>{
    try{
        const cartObj=new Cart({          
            _cartId:new mongoose.Types.ObjectId(),
            userId: req.body.userId,
            productId:req.body.productId,
            cartStatus: req.body.cartStatus,
            quantity: req.body.quantity,
            createdDate: req.body.createdDate,
            updatedDate: req.body.updatedDate

        }); 
        
    const data=await cartObj.save()
       
        res.status(200).json({
            code:1,
            msg:"This is single post request for cart",
            createdCart:data,
            error:null
           
        });

    }catch(err){
        res.status(200).json({
            code:0,
            msg:"Something went wrong",
            createdCart:null,
            error:err
            
        });

    }

}
exports.get_carts=async(req,res,next)=>{
    try{
        const data=await Cart.find();
        if(data){
            res.status(200).json({
            code:1,
            msg:"This is single get request for cart",
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


exports.get_cart_ById = async (req,res,next)=>{
    try{
                const data = await Cart.findById(req.params.cartId);
                if(data){
                   res.status(200).json({
                    code:1,
                    message:"This is simple get request for single cart",
                    data:data,
                    error:null
                   });
                }else{
                    res.status(200).json({
                        code:1,
                        message:"no cart is available with given id",
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


exports.get_cart_ByStatus = async (req,res,next)=>{
    try{
                const data = await Cart.findById(req.params.cartStatus);
                if(data){
                   res.status(200).json({
                    code:1,
                    message:"This is simple get request for single cart",
                    data:data,
                    error:null
                   });
                }else{
                    res.status(200).json({
                        code:1,
                        message:"no cart is available with given id",
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

exports.update_cart=async(req,res,next)=>{
    try{
        const data=await Cart.findByIdAndUpdate(req.params.cartId,req.body,{new:true,runValidator:true})
        res.status(200).json({
            code:1,
            message:"This is simple put request for single cart",
            data:data,
            error:null

        })
    }catch(error){
        res.status(500).json({
            code:0,
            message:"something went wrong",
            data:null,
            error:error

    })
}
}


exports.delete_cart=async (req,res,next)=>{
    try{
       const data= await Cart.findByIdAndDelete(req.params.cartId);
       if(!data){
        res.status(200).json({
            code:1,
            message:"no cart found",
            data:data,
            error:null
        })
       }else{
        res.status(200).json({
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
exports.delete_cartStatus = async (req, res, next) => {
    try {
        const result = await Cart.deleteMany({ cartStatus: 0 });
        if (result.deletedCount > 0) {
            res.status(200).json({
                code: 1,
                message: "Delete request performed successfully",
                deletedCount: result.deletedCount,
                error: null
            });
        } else {
            res.status(200).json({
                code: 1,
                message: "No carts found with cartStatus = 9",
                deletedCount: 0,
                error: null
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 0,
            message: "Something went wrong",
            deletedCount: 0,
            error: error.message
        });
    }
};


exports.cart_items_list = async (req, res, next) => {
    try {
        const result = await Cart.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            }
        ])

        res.status(200).json(result);
    } catch (error) {
        console.error('Error executing aggregation pipeline:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.count_items_list = async (req, res, next) => {
    try {
        
        const count = await Cart.countDocuments();
        

        res.status(200).json({ count });
    } catch (error) {
        console.error('Error counting items in the cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
