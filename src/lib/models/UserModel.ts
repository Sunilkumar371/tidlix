
import mongoose,{Schema,Document,Model} from "mongoose";
import bcrypt from "bcryptjs"
export interface Iuser extends Document{
    username:string,
    email:string,
    password:string
    createdAt:Date,
    updatedAt:Date,
    comparePassword(candidatePassword:string):Promise<boolean>
}

const UserSchema = new Schema<Iuser>({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    },{timestamps:true}
)

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

UserSchema.methods.comparePassword = async function(candidatePassword:string){
    return await bcrypt.compare(candidatePassword,this.password)
    
}

export const User:Model<Iuser> = mongoose.model<Iuser>("User",UserSchema) || mongoose.models.User   