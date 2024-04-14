const mongoose = require('mongoose');
const UserSchema = require('../models/User');
const MessageSchema = require('./Message');

const ChatSchema = new moongoose.Schema({

   from:{
       type: UserSchema.Types.objecId,
       ref: 'user',
       required : true
   },
   to:{
    type: UserSchema.Types.objecId,
       ref: 'user',
       required : true
   },
    message:{
    type : [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'message'
    }],
    required: true 
    }
    
}, {
    timestamps: true
})


module.exports = mongoose.model('Chat', ChatSchema)

