import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
    title: {type: String, required: true, unique: true},
    favor: {type: Boolean, required: true},
    status: {type: String, required: true}
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    toObject: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
})


const Task = model('Task', TaskSchema)
export default Task