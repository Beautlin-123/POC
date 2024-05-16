const express=require('express');
const router=express.Router();
const userModelRequest=require('../api/user.model');



//post request for user

router.post("/",userModelRequest.create_user);
router.get("/:userId",userModelRequest.get_user_ById);
router.get("/email/:userEmail", userModelRequest.get_user_ByEmail);

module.exports=router;