import { model, InferSchemaType, Schema  } from "mongoose"

const userSchema = new Schema({
    name:{ type: String, required: true, unique:true},
    email:{ type: String, required: true, select: true,lowercase:true, unique:true},
    password:{ type:String, required: true, select:false },
    profilePicture:{ type:String, default: ""}
},
{
    timestamps:true
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema)