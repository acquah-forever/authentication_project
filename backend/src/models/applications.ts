import { InferSchemaType, model, Schema } from "mongoose"

const applicationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    job: { type: Schema.Types.ObjectId, ref: "Jobs", required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    linkedin: { type: String, required: true, trim: true },
    github: { type: String, required: true, trim: true },
    portfolio: { type: String, required: true, trim: true},
    resume: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    strongest: { type: String, required: true, trim: true},
    projectLink: { type: String, required: true, trim: true},
    llm: { type: String, required: true, trim: true},
    frontend: { type: String, enum: ["", "beginner", "intermediate", "advanced", "expert"], default: "" },
    backend: { type: String, enum: ["", "beginner", "intermediate", "advanced", "expert"], default: "" },
    databases: { type: String, enum: ["", "beginner", "intermediate", "advanced", "expert"], default: "" },
    aiCodingTools: { type: String, enum: ["", "beginner", "intermediate", "advanced", "expert"], default: "" },
    systems: { type: String, required: true, trim: true },
    interest: { type: String, required: true, trim: true },
    aiTools: { type: String, required: true, trim: true },
    confirm1: { type: Boolean, required: true},
    confirm2: { type: Boolean, required: true},
    status: { type: String, enum: ["submitted", "reviewing", "accepted", "rejected"], default: "submitted" },
}, { timestamps: true })

type Application = InferSchemaType<typeof applicationSchema>

export default model<Application>("Application", applicationSchema)
