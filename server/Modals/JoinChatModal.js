const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const zholar=new Schema({
    Username:{
        type:String,
        required:true
    },
    ChatRoomname:{
        type:String,
        required:true
    }
});

const Zholar=mongoose.model('JoinerDetail',zholar);
module.exports=Zholar;