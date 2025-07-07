import mongoose,{Schema,Document} from "mongoose";

export interface Itodo extends Document{
    title:string,
    description:string,
    isCompleted:boolean,
    user:mongoose.Types.ObjectId
    createdAt:Date,
    updatedAt:Date
}

const TodoSchema = new Schema<Itodo>({
    title:{type:String,required:true},
    description:{type:String},
    isCompleted:{type:Boolean,default:false},
    user:{type:Schema.Types.ObjectId,ref:"User",required:true},
    
    },
    {timestamps:true}
)

export const Todo = mongoose.models.Todo || mongoose.model<Itodo>("Todo",TodoSchema)