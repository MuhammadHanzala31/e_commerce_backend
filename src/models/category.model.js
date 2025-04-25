import mongoose,{Schema} from "mongoose";

const categorySchema = new Schema({
    name : {
        type:String
    }
},
{timestamps : true})

export const Category = mongoose.model("Category ", categorySchema)