const mongoose = require('mongoose');

const commentschema = new mongoose.Schema({

    PostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        
    },

    Comment: {
        type: String,
        required : true

    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },


}, { timestamps: true }
)

module.exports = mongoose.model('Comment',commentschema )

