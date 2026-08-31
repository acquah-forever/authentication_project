import { model, InferSchemaType, Schema } from "mongoose";

const jobsSchema = new Schema({
    
    jobTitle: {type: String, required: true},
    company : {type: String, required: true},
    jobLocation: {type: String, required:true},
    employmentType: {type: String, required:true, enum: ["Part-Time","Full-Time","Contract","Volunteer"]},
    experinceLevel: {type: String, required:true, enum: ["Entry-Level","Junior","Senior","Manager"]},
    requirements: {type: String},
    jobDescription: {type: String}
})

type Jobs = InferSchemaType<typeof jobsSchema>

export default model <Jobs>("Jobs", jobsSchema) 