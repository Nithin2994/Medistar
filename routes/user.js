const express=require('express');
const router=express.Router();
const utility=require('../utility/utility');
const tables=require('../Model/baseTable');
var loggerinfo = require('log4js').getLogger("index");

let VerifyToken=require('../routes/auth/VerifyToken');
let TokenDetails=require('../routes/auth/TokenDetails');

let authToken=require('../routes/auth/AuthController');

router.post('/singup',async function(req,res){
 let email=req.body.email;
 let mobile=req.body.mobile;
 let firstName=req.body.first_name;
 let lastName=req.body.last_name;
 let password=req.body.password;
 if(!email || email===""){
     return res.send({'success':false,"message":"Please Enter Email"});
 }
    if(!mobile || mobile===""){
        return res.send({'success':false,"message":"Please Enter Mobile"});
    }
    if(!firstName || firstName===""){
        return res.send({'success':false,"message":"Please Enter first Name"});
    }
    if(!password || password===""){
        return res.send({'success':false,"message":"Please Enter Password"});
    }
    const [err,checkEmail]=await tables.usersTable.checkUser({'email':email});

    if(err){
        return res.status(500).send({'success':false,"message":"Something Went Wrong Try Again"});

    }
    if(checkEmail.length){
        return res.send({'success':false,"message":"Email Already Exists"});
    }

    const [mobileErr,checkMobile]=await tables.usersTable.checkUser({'mobile':mobile});

    if(mobileErr){
        return res.status(500).send({'success':false,"message":"Something Went Wrong Try Again"});

    }
    if(checkMobile.length){
        return res.send({'success':false,"message":"Mobile Already Exists"});
    }
     let encrypt=utility.encrypt(password);

      const [insertErr,insertResponse]=await tables.usersTable.insertUser([firstName,lastName,mobile,email,encrypt.password,encrypt.hash,1]);
    if(insertErr){
        return res.status(500).send({'success':false,"message":"Something Went Wrong Try Again"});
    }
    if(insertResponse){
        return res.send({'success':true,"message":"User Signup Successfully"});
    }
    return res.status(500).send({'success':false,"message":"Something Went Wrong Try Again"});

});

router.post('/verfiy-otp',async function(req,res){
    const otp=req.body.otp;
    const [userError,userDetails]=await tables.usersTable.getUserDetails({'user_id':checkEmail[0].user_id});
    let generateAuthToken=authToken.generateAuthToken(JSON.parse(JSON.stringify(userDetails[0])));
   return  res.send({"success":true,'auth-token':generateAuthToken,'profile_details':userDetails[0]});
});
router.post('/login',async function(req,res){
    let decryptPassword=utility.decrypt(checkEmail[0].password,checkEmail[0].hash);
    if(decryptPassword!==password){
        return res.send({'success':false,"message":"Invalid User"});
    }
    const [userError,userDetails]=await tables.usersTable.getUserDetails({'user_id':checkEmail[0].user_id});
    let generateAuthToken=authToken.generateAuthToken(JSON.parse(JSON.stringify(userDetails[0])));
   return  res.send({"success":true,'auth-token':generateAuthToken,'profile_details':userDetails[0]});
});

router.post('/profile-details',TokenDetails,async function (req,res) {
//    res.send({'success':true,'auth-token':token})

    let userDetails=req.userDetails;
    if(!req.body ||req.body===""){
        return res.status(200).send({'success':false,'message':"Please Provide Cart Type"})
    }
    let user_id=req.body.user_id;
    if(!userDetails ||!userDetails.user_id){
        return res.status(403).send({'success':false,'message':"Login To Process"})
    }
    if(!user_id || user_id===''){
        return res.status(200).send({'success':false,'message':"Please Provide Login Id"})
    }
    const [userError,profileDetails]=await tables.usersTable.getUserDetails({'user_id':user_id});
    if(userError){
        return res.status(500).send({'success':false,"message":"Something Went Wrong Try Again"});
    }
    return  res.send({"success":true,'profile_details':profileDetails[0]});

});
router.get('/send-email',async function (req,res) {
    let sendMail=require('../utility/sendMail');
    sendMail.sendMail({'name':"",'email':'','cards':[]});
    return  res.send({'success':true,'message':'card Details'});

});
module.exports=router;
