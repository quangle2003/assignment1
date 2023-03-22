import Product from "../models/product";
import joi from "joi";

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    status: joi.string().required(),
})

export const create = async(req, res) => {
    try{
        const {error} = productSchema.validate(req.body)
        if(error){
            res.json({
                message: error.details[0].message,
            });
        }
        const product = await Product.create(req.body);
        return res.status(201).json({
            message: "Tao san pham thanh cong",
            product,
        })

    }catch(error){
        return res.status(400).json({
            message: error,
        });
    }
};

export const getAll = async(req, res) => {
    try{
        const products = await Product.find(req.body);
        return res.status(201).json(products)

    }catch(error){
        return res.status(400).json({
            message: error,
        });
    }
};

export const get = async(req, res) => {
    try{
        const product = Product.findById(req.params.id);
        return res.status(201).json(product)

    }catch(error){
        return res.status(400).json({
            message: error,
        });
    }
};

export const update = async (req, res) =>{
    try{
        const { error } = productSchema.validate(req.body);
        if(error){
            return res.json({
                message: error.details[0].message,
            });
        }
        const product = await Product.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        return res.json({
            message: "Cap nhat thanh cong",
            product,
        });
    }catch(error){
        return res.status(400).json({
            message: error
        });
    }
};

export const remove = async (req, res) =>{
    try{
        const product = await Product.findOneAndDelete({_id: req.params.id})
        return res.json({
            message: "Xoa thanh cong",
            product,
        });
    }catch(error){
        return res.status(400).json({
            message: error
        });
    }
};