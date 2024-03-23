const {Schema,model}= require("mongoose");

const taskSchema= new Schema(
    {
        title:String,
        description:String,
        deadline:{type:Date},
        creator:{ type: Schema.Types.ObjectId, ref: 'User' },
        isCompleted:{type:Boolean,default:false}
    },{
        versionKey:false
    }
)

const TaskModel= model("Task",taskSchema);

module.exports= TaskModel