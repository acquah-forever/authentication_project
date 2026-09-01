import { model, InferSchemaType, Schema } from "mongoose";

const jobsSchema = new Schema({
    
    jobTitle: {type: String, required: true, trim: true},
    company : {type: String, required: true, trim: true},
    jobLocation: {type: String, required:true, trim: true},
    employmentType: {type: String, required:true, enum: ["Part-Time","Full-Time","Contract","Volunteer"]},
    experienceLevel: {type: String, required:true, enum: ["Entry-Level","Junior","Senior","Manager"]},
    requirements: [{type: String, required:true, trim: true}],
    jobDescription: {type: String, required:true, trim: true}
},{timestamps: true})

type Jobs = InferSchemaType<typeof jobsSchema>

export default model <Jobs>("Jobs", jobsSchema) 