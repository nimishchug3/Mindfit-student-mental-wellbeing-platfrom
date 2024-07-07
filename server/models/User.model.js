const mongoose=require("mongoose");

const bcrypt=require("bcrypt");

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    name:{
        type:String,
    },
    bio:{
        type:String,   
    },
    profilePic:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        minLength: 6
    },
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    points:{
        type:Number,
    },
    ranking:{
        type:Number,
    },
    phone:{
        type:String,
    },
    challenges:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Challenge"
    }],
    events:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event"
    }],
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],        
});

UserSchema.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.calculatePoints = function () {
    let pointsFromPosts = 0;
    let pointsFromLikes = 0;
    let pointsFromEvents = 0;
    let pointsFromChallenges = 0;

    if (this.posts) {
        pointsFromPosts = this.posts.length * 10;
        pointsFromLikes = this.posts.reduce((totalLikes, post) => totalLikes + (post.likes ? post.likes.length : 0), 0);
    }

    if (this.events) {
        pointsFromEvents = this.events.length * 20;
    }

    if (this.challenges) {
        pointsFromChallenges = this.challenges.length * 50;
    }

    return pointsFromPosts + pointsFromLikes + pointsFromEvents + pointsFromChallenges;
};



const User=new mongoose.model("User",UserSchema);

module.exports=User;