import { model, InferSchemaType, Schema } from "mongoose";

const jobsSchema = new Schema({
    
    jobTitle: {type: String},
    jobLocation: {type: String},
    employmentType: {type: String},
    experinceLevel: {type: String},
    jobDescription: {type: String}
})

type Jobs = InferSchemaType<typeof jobsSchema>

export default model <Jobs>("Jobs", jobsSchema) 