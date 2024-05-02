const {userSchema}  = require('../schemas/User')
const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')

router.post('/createuser', 
        [body('email').isEmail(), body('name').isLength({min:5}),body('password', 'Incorrect Password').isLength({min:5})],
 async (req, res)=>{
    console.log('In 2')
    
    const errors =  validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)
    try {

          userSchema.create({
            name: req.body.name,
            email: req.body.email,
            location: req.body.location,
            password: secPassword
        }).then(()=>{
            console.log("created account")
            res.json({success:true})
        }).catch((err)=>{
            console.log(err)
            res.json({success:err})
        })
    
        
    }
    catch (error){
        res.json({success:error})
        console.log("not added")
    }
})


module.exports = router;
