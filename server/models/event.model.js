const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({


    name:{
        type:String,
        maxLength:50
    },
    description:{

        type:String,
        maxLength: 1000 
    },
    owner:{
        type:String,
        required:true,

    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    }],
      
    date:{
       type:String,
       required:true 
    },
    location_src:{
        type:String
 }
})
const event =new mongoose.model("event",eventSchema);

module.exports=event;