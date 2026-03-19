import mongoose, {Schema, model} from "mongoose";

const reviewSchema = new Schema({
    idEmployee: {
        type: String
    },
    idProducts: {
        type: String
    },
    rating: {
        type: number
    },
    comment: {
        type: String
    }
},{
    timestamps:true,
    strict:false
});

export default model("Reviews", reviewSchema)