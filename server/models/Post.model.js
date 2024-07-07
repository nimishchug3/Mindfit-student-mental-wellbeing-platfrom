const mongoose=require('mongoose');

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
          }, // Reference to the user who created the post
    content: { type: String,
               required: true
             },
    likes: [{ type: mongoose.Schema.Types.ObjectId,
                 ref: 'User'
         }],
    replies: [{ type: mongoose.Schema.Types.ObjectId,
                 ref: 'Reply'
         }],     
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;