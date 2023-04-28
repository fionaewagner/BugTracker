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

export const getBugById= async(req,res,next)=>{
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No bug with id: ${_id}`);
  try{
    const bug = await Bug.findById(_id).populate({
      path: 'comments',
      populate: { path: 'creator' }
    });
    res.status(200).json(bug);

  }catch(error){
    console.log(error)
    return next(error)
  }
}

export const getBugsByGroup=async(req,res,next)=>{
  const groupId = req.body;
  //6425ed74688047b8498c3c91
  try {
    const bugs = await await Bug.find({ groupId: groupId })
    console.log("Getting bugs" + bugs)
    res.status(200).json(bugs)
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Could not retreive bugs", 500))
  }

}
export const getBugsByUser=async()=>{

}

export const updateBug = async (req, res) => {
  const { _id } = req.params;
  const {
    name,
    description,
    project,
    priority,
    creator,
    assigned,
    status,
    datePosted,
    groupId } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No bug with id: ${_id}`);

  const updatedBug = {
    name,
    description,
    project,
    priority,
    creator,
    assigned,
    status,
    datePosted,
    groupId  };

  try{
    await Bug.findByIdAndUpdate(_id, updatedBug, { new: true });
    res.json(updatedBug);
  }catch(err){
    console.log(err)
  }
}

export const createBug = async (req, res, next) => {
    console.log('creating bug')
    console.log(req.body);
    const {
        name,
        description,
        project,
        priority,
        creator,
        assigned,
        status,
        datePosted,
        groupId } = req.body;
  
    try {
      const bug = await Bug.create({
        name,
        description,
        project,
        priority,
        creator,
        assigned,
        status,
        datePosted,
        groupId
      });

      await bug.save()
      res.status(201).json(bug);
  
    } catch (err) {
      next(err);
    }
  };

  export const deleteBug = async (req, res, next) => {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No bug with id: ${_id}`);
    try{
        await Bug.findByIdAndRemove(_id);

    res.json({ message: "Bug deleted successfully." });
    }catch(err){
        console.log(err)
    }
    

}

export const getBugsFiltered = async (req, res, next) => {
  const { assigned, creator, priority, status, groupId } = req.body;

  if (!groupId) {
    return res.status(400).json({ message: "groupId is required" });
  }

  try {
    const filters = {
      assigned: assigned || { $exists: true },
      creator: creator || { $exists: true },
      priority: priority || { $exists: true },
      status: status || { $exists: true },
      groupId: groupId
    };

    const bugs = await BugModel.find(filters);

    res.json(bugs);
  } catch (error) {
    next(error);
  }
};


const bugRouter = express.Router