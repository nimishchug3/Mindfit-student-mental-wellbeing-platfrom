const mongoose=require("mongoose");

const Therapistchema = new mongoose.Schema({

    name:{

        type:String,
        requried:true
    },
    Details:{
        type:String,
        

    },
    speciality:{
        type:String,
    },
    availability:{
        type:Boolean,
        required:true,

    },
    Room_no:{
        type:Number,
        required:true,

    }




})
const Therapist=new mongoose.model("Therapist",Therapistchema);

module.exports=Therapist;