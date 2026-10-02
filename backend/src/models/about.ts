import { model, Schema, InferSchemaType } from "mongoose"

const aboutSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    about: { type: String, required: true, trim: true }
})

type About = InferSchemaType<typeof aboutSchema>

export default model<About>("About", aboutSchema)