require ('dotenv').config();
const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const productRoutes=require('./api/products');
const cartRoutes=require('./api/carts');
const orderRoutes=require('./api/orders');
const userRoutes=require('./api/users');
const voucherRoutes=require('./api/vouchers')


// app.use((req,res,next)=>{
//     res.status(200).json({
//         msg:"This is simple get request"
//     });
// });
//use of morgan
app.use(morgan("dev"));
//mongoose connection string
mongoose.connect("mongodb://localhost:27017/",{
    useNewUrlParser:true,
})
.then(()=>{console.log("connected successfully")});

//body parser code
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//code to handle CORS Error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();

})

app.use("/product",productRoutes);
app.use("/cart",cartRoutes);
app.use("/order",orderRoutes);
app.use("/user",userRoutes);
app.use("/voucher",voucherRoutes);


//handle error by using middle
app.use((req,res,next)=>{
    const error=new Error("Route not found");
    
    //middleware for pass error
    next(error);
})
app.use((error,req,res,next)=>{
    res.status(500).json({
        error:error.message
    })
})

module.exports=app;