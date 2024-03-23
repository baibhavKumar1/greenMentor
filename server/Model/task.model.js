const {Schema,model}= require("mongoose");

const taskSchema= new Schema(
    {
        title:String,
        description:String,
        deadline:String,
        creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    },{
        versionKey:false
    }
)

const TaskModel= model("Task",taskSchema);

module.exports= TaskModel