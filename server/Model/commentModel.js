import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
    text: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;