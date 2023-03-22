import express from 'express'
import mongoose from 'mongoose';
import ErrorResponse from '../utils/errResponse.js';
import Bug from '../Model/bugModel.js';

export const getBugs = async(req, res, next)=>{
    try {
        const bugs = await Bug.find({})
        res.status(200).json(bugs)
        
    } catch (error) {
        next(err)
    }
}
export const createBug = async (req, res, next) => {
    console.log('creating bug')
    console.log(req.body);
    const {  _id,
        name,
        description,
        project,
        priority,
        creator,
        assigned,
        status,
        datePosted } = req.body;
  
    try {
      const bug = await Bug.create({
        _id,
        name,
        description,
        project,
        priority,
        creator,
        assigned,
        status,
        datePosted
      });

      await bug.save()
      res.status(201).json(bug);
  
    } catch (err) {
      next(err);
    }
  };


const bugRouter = express.Router