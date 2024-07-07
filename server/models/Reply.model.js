// reply.model.js
const mongoose = require('mongoose');


const replySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          }, // Reference to the user who posted the reply
    post: { type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
          }, // Reference to the post being replied to
    content: { type: String,
               required: true
             },
    
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
