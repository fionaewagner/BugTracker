import express, { json } from 'express'
import Group from '../Model/groupModel.js';
import ErrorResponse from '../utils/errResponse.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto'
import mongoose from 'mongoose';

export const getGroups = async(req, res, next)=>{
    try {
        const groups = await Group.find({})
        res.json(groups)
        
    } catch (err) {
        next(err)
        
    }
}

export const createGroup = async (req, res, next) => {
    console.log('creating group')
    console.log(req.body);
    const { 
        name,
       key } = req.body;
  
    try {
      const group = await Group.create({
        name,
        key
      });

      await group.save()
      res.status(201).json(group);
  
    } catch (err) {
      next(err);
    }
  };

  export const joinGroup =async(req, res, next)=>{
    const {name, key} = req.body

    if(!name || !key){
       return next(new ErrorResponse("Please provide a name and key",400))
    }
    try{
        const group = await Group.findOne({name}).select("+key");
        

        if(!group){
           return next(new ErrorResponse("Invalid Credentials", 401))
        }
        res.status(200).json(group)
    }
    catch(error){
        res.status(500).json({
            success:false,
            error: error.message
        })

    }
}

export const deleteGroup = async (req, res, next) => {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No group with id: ${_id}`);

    await Group.findByIdAndRemove(_id);

    res.json({ message: "Group deleted successfully." });

}