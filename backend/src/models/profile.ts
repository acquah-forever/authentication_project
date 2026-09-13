import { model, InferSchemaType, Schema } from "mongoose"

const profileSchema = new Schema({
    
    firstName: {type: String, required: true, trim:true},
    lastName: {type: String, required: true, trim:true},
    country: {type: String, required: true, trim: true},
    organization: {type: String, required: true, trim:true},
    education: {type: String, required: true, trim:true},
    phoneNumber: {type: Number, required: true},
    website: {type:String, required:true, trim:true}
})

type Profile = InferSchemaType<typeof profileSchema>

export default model<Profile>('Profile', profileSchema)