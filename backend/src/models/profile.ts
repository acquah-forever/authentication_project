import { model, InferSchemaType, Schema } from "mongoose"

const profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    firstName: {type: String, required: true, trim:true},
    lastName: {type: String, required: true, trim:true},
    country: {type: String, required: true, trim: true},
    organization: {type: String, required: true, trim:true},
    education: {type: String, required: true, trim:true},
    industry: {type: String, required: false, trim:true},
    phoneNumber: {type: String, required: true, trim: true, match: [/^\+?[1-9]\d{6,14}$/, "Please provide a valid phone number"]},
    website: {type:String, required:true, trim:true}
}, {
    timestamps: true,
})

type Profile = InferSchemaType<typeof profileSchema>

export default model<Profile>('Profile', profileSchema)
