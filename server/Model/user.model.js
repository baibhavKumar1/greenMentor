const {Schema,model}= require("mongoose");

const userSchema= new Schema(
    {
        name:String,
        avatar:String,
        email:String,
        password:String,
        tasks:[{ type: Schema.Types.ObjectId, ref: 'Task' }]
    },{
        versionKey:false
    }
)

const UserModel= model("User",userSchema);

module.exports= UserModel