import express, { json } from 'express'
import User from '../Model/userModel.js'
import ErrorResponse from '../utils/errResponse.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto'
import mongoose from 'mongoose';

export const getUsers = async(req, res, next)=>{
    try {
        const users = await User.find({})
        res.json(users)
        
    } catch (error) {
        next(err)
    }
}

export const getUserById=async(req,res,next)=>{
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id: ${_id}`);
    try{
        const user = await User.findById(_id);
        res.status(200).json(user);
    }
    catch(err){
        next(err)
    }
}

export const getUsersByGroup=async(req,res,next)=>{
    const { groupId } = req.query;
    if (!mongoose.Types.ObjectId.isValid(groupId)) return res.status(404).send(`No user with group id: ${groupId}`);
    try{
        const users = await await User.find({ groupId: groupId })
        console.log("Getting users" + users)
        res.status(200).json(users)

    }catch(err){
        console.log(err);
        return next(new ErrorResponse("Could not retreive users", 500))

    }
}
    
    


export const register = async (req, res, next) => {
    console.log('registering')
    console.log(req.body);
    const { username, email, password, groupId, admin } = req.body;
  
    try {
      const user = await User.create({
        username,
        email,
        password,
        groupId,
        admin
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

export const deleteUser = async (req, res, next) => {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id: ${_id}`);
    try{
        await User.findByIdAndRemove(_id);

    res.json({ message: "User deleted successfully." });
    }catch(err){
        console.log(err)
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
    res.status(statusCode).json({success:true,token, _id: user._id, username: user.username})

}

export const updateUser = async (req, res) => {
    const { _id } = req.params;
    const {groupId} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id: ${_id}`);
  
    const updatedUser = {groupId};
    console.log("this group is: " + req.body)

        try{
            await User.findByIdAndUpdate(_id, updatedUser, { new: true });
  
            res.json(updatedUser);
        }catch(err){
            res.status(500).json({
                success:false,
                error: err.message
            })
        }
  
    
  }

export const setAdmin=async(req,res)=>{
    const userId = '641dc228e125709e985aa359'
    const updatedUser = {admin:true};
    

        try{
            await User.findByIdAndUpdate(userId, updatedUser, { new: true });
  
            res.json(updatedUser);
        }catch(err){
            res.status(500).json({
                success:false,
                error: err.message
            })
        }
}


