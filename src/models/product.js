import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    status: {
        type: Boolean
    }
})

export default mongoose.model("Product", productSchema);