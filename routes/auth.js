const express = require('express')
const User = require('../models/user')

const router = express.router()

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

