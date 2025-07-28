import mongoose, { Schema } from "mongoose";

const loopSchema = new Schema({
    author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
       },
       media: {
         type: String,
         required: true,
       },
       caption:{
           type:String,
   
       },
       like:[
           {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
           }
       ],
       comments:[
           {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
           }
       ]
},{timestamps:true})

const loop = mongoose.model("Loop",loopSchema);

export default loop;