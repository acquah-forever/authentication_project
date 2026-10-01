import { model, Schema, InferSchemaType } from "mongoose"

const aboutSchema = new Schema({
    about: { type:String, required: true, trim: true }
})

type About = InferSchemaType<typeof aboutSchema>

export default model<About>("About", aboutSchema)