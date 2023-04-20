import mongoose from "mongoose";

const bugSchema=mongoose.Schema({
    name: String,
    description: String,
    project:String,
    priority: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assigned: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: String,
    datePosted:Date,
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }]
})

const Bug = mongoose.model('Bug', bugSchema);

export default Bug;