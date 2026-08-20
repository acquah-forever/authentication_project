import { model, InferSchemaType, Schema  } from "mongoose"

const userSchema = new Schema({
    username:{ type: String, required: true, unique:true},
    email:{ type: String, required: true, select: true,lowercase:true},
    password:{ type:String, required: true, select:false }
},
{
    timestamps:true
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema)