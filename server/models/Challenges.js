const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({


    name:{
        type:String,
        maxLength:50
    },
    description:{

        type:String,
        maxLength: 200 
    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
}],
      
    date:{
       type:String,
       required:true 
    },
    duration:{
        type:String,
    }
})
const Challenge =new mongoose.model("challenge",challengeSchema);

module.exports=Challenge;