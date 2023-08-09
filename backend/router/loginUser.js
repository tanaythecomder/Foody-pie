// import dotenv from dotenv

const express = require('express')
const router = express.Router()
const {body, validationResult}  = require('express-validator')
const {userSchema} = require('../schemas/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

require('dotenv').config();
const secretKey = "77657689808yugyugjhhnnbjbu787"
router.post('/loginuser', 
[body('email').isEmail()]
,
  (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try{
        // console.log(JSON.stringify({email :req.body.email, password:req.body.password}))
        // console.log(process.env.SECRETKEY)
        let userData =  userSchema.findOne({email :req.body.email}).then((userData)=>{
            
            bcrypt.compare(req.body.password, userData.password,(err, isMatch)=>{
                if(err) return err
                const data = {
                    
                    user:{
                        id: userData.id
                    }
                    
                }   
                const authToken = jwt.sign(data, process.env.SECRETKEY)
                
                if(isMatch) res.json({success:true, authToken})
                else res.status(400).json({success:false})
                

                
            })
            
           
            
        })
            // console.log(newUser.password)
            // if(newUser.password ==req.body.password) {
            //     console.log("Succesfully loggedin")
            //     res.json({success:true});
            // }
            // else res.json({success:false})
        .catch(()=>{
                res.json({success:false})
        })
    }
    catch(error){
       res.json({success:false})
    }
    
})

module.exports = router