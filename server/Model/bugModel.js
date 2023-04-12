import mongoose from "mongoose";

const bugSchema=mongoose.Schema({
    _id: Number,
    name: String,
    description: String,
    project:String,
    priority: String,
    creator: String,
    assigned: String,
    status: String,
    datePosted:Date,
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
})

const Bug = mongoose.model('Bug', bugSchema);

export default Bug;