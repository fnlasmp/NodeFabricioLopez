import { Router }  from "express";

import ProductModel from "../models/product.model.js"

const router = Router()

router.post("/", async (req, res)=>{
    try{
        const newProduct = await ProductModel.create(req.body)
        console.log("info del body", req.body)
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get("/", async (req, res)=>{
    try{
        const elementsPerPage = req.query.limit || 10;
        const sortPrice = req.query.sort === "min" ? 1 : -1;
        const page = req.query.page ?? 1;
        const category = req.query.category


        const filter = {}
        if(category) filter.category = category


        let infoPaginate = await ProductModel.paginate(
            filter,
            {
                limit: elementsPerPage,
                page: page,
                sort: {price: sortPrice},
            },
        );
        console.log(infoPaginate)
        infoPaginate.docs = infoPaginate.docs.map((doc)=> doc.toObject())
        res.render("products", {info: infoPaginate})
    } catch (error) {
        res.status(500).json({message: "No existen productos"})
    }
})

export default router