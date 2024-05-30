import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    bedroom: {
        type: Number,
        required: true,
        min: 0 // Ensuring the number of bedrooms cannot be negative
    },
    bathroom: {
        type: Number,
        required: true,
        min: 0 // Ensuring the number of bathrooms cannot be negative
    },
    propertyType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Ensuring the price cannot be negative
    },
    propertyImage: {
        type: String,
        required: true,
        default: "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const PropertyModel = mongoose.model('Property', propertySchema);

export default PropertyModel;
