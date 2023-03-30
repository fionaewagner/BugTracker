import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const groupSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please provide group name"]
    },
    key: {
      type: String,
      required: [true, "Please provide group key"],
      unique: true
    }
  });


const Group = mongoose.model('Group',groupSchema)

export default Group