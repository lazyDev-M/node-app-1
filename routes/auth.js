const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.post('/signup', async (req,res) => {
    try{
        const {name, email, password} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:'User with that email already exits'})
        }
        const user = new User({name,email, password})
        await user.save()
        res.status(201).json({message:'user created successfully'})
    }catch (err) {
        res.status(500).json({message:'user creation failed',error:err.message})
    }
})

router.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        console.log(user.password);
        
        if(!user) return res.status(404).json({message:'User not found'})

        const isMatch = await bcrypt.compare(password,user.password)
        console.log(password);
        
        if(!isMatch) return res.status(401).json({message:'invalid credentials'})

            res.send('login successfull')
    
    } catch (err) {
      res.status(500).json({message:'internal server error',error: err.message})
    }
})

module.exports = router