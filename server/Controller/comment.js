import express, { json } from 'express'
import Group from '../Model/groupModel.js';
import ErrorResponse from '../utils/errResponse.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto'
import mongoose from 'mongoose';
import Comment from '../Model/commentModel.js';
import Bug from '../Model/bugModel.js';

export const createComment = async (req, res, next) => {
    console.log('creating comment');
    console.log(req.body);
    const { text, creator, bugId } = req.body;
    console.log(bugId)
   
    try {
        const comment = await Comment.create({
        text,
        creator
        });

        const updatedBug = await Bug.findByIdAndUpdate(
        bugId,
        { $push: { comments: comment } },
        { new: true }
        );

        res.status(201).json({
        comment,
        bug: updatedBug
        });

    } catch (err) {
        next(err);
    }
  };

  export const getComment = async (req,res, next)=>{
    const {_id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No comment with id: ${_id}`);
    try{
        const comment = await Comment.findById(_id)
        res.status(200).json(comment)
    }catch(err){
        next(err)
    }
  }

  export const getComments=async(req,res,next)=>{
    try {
        const comments = await Comment.find({})
        res.json(comments)
        
    } catch (error) {
        next(err)
    }

  }
