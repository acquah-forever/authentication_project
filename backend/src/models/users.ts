import { model, InferSchemaType, Schema  } from "mongoose"

const userSchema = new Schema({
    username:{ type: String, required: true, select: false},
    emai:{ type: String, required: true, select: true},
    password:{ type:String, required: true }
});

type User = InferSchemaType<typeof "userSchema">;

export default model User<userSchema, "userSchema">