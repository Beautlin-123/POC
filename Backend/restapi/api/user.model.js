const mongoose=require('mongoose');
const User=require('./userModel');

//code for post request
exports.create_user=async(req,res,next)=>{
    try{
        const userObj=new User({
            _id:new mongoose.Types.ObjectId(),
            name:req.body.name,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            address:req.body.address,
            password:req.body.password
    
        });
        
    const data=await userObj.save()
       
        res.status(200).json({
            code:1,
            msg:"This is single post request for user",
            createdUser:data,
            error:null
            
        });

    }catch(err){
        res.status(200).json({
            code:0,
            msg:"Something went wrong",
            createdUser:null,
            error:err
            
        });

    }

}
exports.get_user_ById = async (req,res,next)=>{
    try{
                const data = await User.findById(req.params.userId);
                if(data){
                   res.status(200).json({
                    code:1,
                    message:"This is simple get request for single user",
                    data:data,
                    error:null
                   });
                }else{
                    res.status(200).json({
                        code:1,
                        message:"no user is available with given id",
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
exports.get_user_ByEmail = async (req, res, next) => {
    try {
        const email = req.params.userEmail;
        const user = await User.findOne({ email: email }); // Finding the user by email
        if (user) {
            res.status(200).json({
                code: 1,
                message: "User found",
                user: user,
                error: null
            });
        } else {
            res.status(404).json({
                code: 0,
                message: "User not found",
                user: null,
                error: null
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 0,
            message: "Something went wrong",
            user: null,
            error: error.message
        });
    }
};