let express=require('express');
let router=express.Router();
let utility=require('../utility/utility');

let authToken=require('../routes/auth/AuthController');

router.post('/generate-token',function (req,res) {
       let token=authToken.generateAuthToken({'name':1});
   return res.send({'success':true,'auth-token':token})
});

module.exports=router;
