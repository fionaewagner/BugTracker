import express, { json } from 'express'
import User from '../Model/userModel.js'
import ErrorResponse from '../utils/errResponse.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto'

export const getUsers = async(req, res, next)=>{
    try {
        const users = await User.find({})
        res.json(users)
        
    } catch (error) {
        next(err)
        
    }
}


export const register = async (req, res, next) => {
    console.log('registering')
    console.log(req.body);
    const { username, email, password } = req.body;
  
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
  
      sendToken(user, 200, res);
    } catch (err) {
      next(err);
    }
  };

export const login =async(req, res, next)=>{
    const {email, password} = req.body

    if(!email || !password){
       return next(new ErrorResponse("Please provide an email and password",400))
    }
    try{
        const user = await User.findOne({email}).select("+password");
        

        if(!user){
           return next(new ErrorResponse("Invalid Credentials", 401))
        }

        const isMatch = await user.matchPassword(password);
        
        if(!isMatch){
            return next(new ErrorResponse("Invalid Credentials", 401))
        }

        sendToken(user,201,res);

    }
    catch(error){
        res.status(500).json({
            success:false,
            error: error.message
        })

    }
}

export const forgotPassword= async(req, res,next)=>{

    const {email} = req.body;
    try {
        const user  = await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("Email could not be sent", 404))
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            })

            res.status(200).json({
                success:true,
                data: "Email sent"
            })
            
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be synced", 500))
            
        }

        
    } catch (error) {
         next(error)
    }

}

export const resetPassword= async(req, res, next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest('hex');

    try {

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt: Date.now()}
        })

        if(!user){
            return next(new ErrorResponse("Invalid Reset Token",400))
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Reset Success"
        })
        
    } catch (error) {

        return next(error)
        
    }

}

const sendToken=(user, statusCode,res)=>{
    const token = user.getSignedToken();
    res.status(statusCode).json({success:true,token,username: user.username})

}


