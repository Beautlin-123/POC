const mongoose=require('mongoose');
const Voucher=require('./voucherModel');

//code for post request
exports.create_voucher=async(req,res,next)=>{
    try{
        const voucherObj=new Voucher({
            _id:new mongoose.Types.ObjectId(),
            discountCode:req.body.discountCode,
            discountAmount:req.body.discountAmount
    
        });
        
    const data=await voucherObj.save()
       
        res.status(200).json({
            code:1,
            msg:"This is single post request for voucher",
            createdVoucher:data,
            error:null
            
        });

    }catch(err){
        res.status(200).json({
            code:0,
            msg:"Something went wrong",
            createdVoucher:null,
            error:err
            
        });

    }

}
//code for getting voucher list
exports.get_vouchers=async(req,res,next)=>{
    try{
        const data=await Voucher.find();
        if(data){
            res.status(200).json({
            code:1,
            msg:"This is single get request for voucher",
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
exports.get_user_ByDiscount = async (req, res, next) => {
    try {
        const discountCode = req.params.voucherDiscount;
        const voucher = await Voucher.findOne({ discountCode: discountCode }); // Finding the user by email
        if (voucher) {
            res.status(200).json({
                code: 1,
                message: "Voucher found",
                voucher: voucher,
                error: null
            });
        } else {
            res.status(404).json({
                code: 0,
                message: "Voucher not found",
                voucher: null,
                error: null
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 0,
            message: "Something went wrong",
            voucher: null,
            error: error.message
        });
    }
};
exports.get_user_ByAmount = async (req, res, next) => {
    try {
        const discountAmount = req.params.voucherAmount;
        const voucher = await Voucher.findOne({ discountAmount: discountAmount }); // Finding the user by email
        if (voucher) {
            res.status(200).json({
                code: 1,
                message: "Voucher found",
                voucher: voucher,
                error: null
            });
        } else {
            res.status(404).json({
                code: 0,
                message: "Voucher not found",
                voucher: null,
                error: null
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 0,
            message: "Something went wrong",
            voucher: null,
            error: error.message
        });
    }
};
