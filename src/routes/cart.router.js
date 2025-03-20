import { Router }  from "express";

import CartModel from "../models/cart.model.js";

const router = Router()

router.post("/", async (req, res)=>{
    try{
        const newCart = await CartModel.create(req.body)
        console.log("info del body", req.body)
        await newCart.save();
        res.json(newCart);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        const productIndex = cart.products.findIndex((p) => p.product.toString() === pid);
        if (productIndex === -1) {
            cart.products.push({ product: pid, quantity: 1 });
        } else {
            cart.products[productIndex].quantity += 1;
        }
        await cart.save();
        res.json({ message: "Producto agregado al carrito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await CartModel.findById(cid).populate("products.product");

        if (!cart) {
            return res.render("cart", { empty: true });
        }
        console.log(cart)
        res.render("cart", { cart: cart.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        const productIndex = cart.products.findIndex((p) => p.product.toString() === pid);
        if (productIndex === -1) {
            return res.status(404).json({ error: "Producto no encontrado en el carrito" });
        }
        cart.products.splice(productIndex, 1);
        await cart.save();
        res.json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        cart.products = [];
        await cart.save();
        res.json({ message: "Carrito eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        cart.products = req.body.products;
        if(!req.body.products){
            return res.status(400).json({ error: "No se proporcionaron productos" });
        }
        await cart.save();
        res.json({ message: "Carrito actualizado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        const productIndex = cart.products.findIndex((p) => p.product.toString() === pid);
        if (productIndex === -1) {
            return res.status(404).json({ error: "Producto no encontrado en el carrito" });
        }
        cart.products[productIndex].quantity = req.body.quantity;
        if(!req.body.quantity){
            return res.status(400).json({ error: "No se proporciono una cantidad" });
        }
        if(req.body.quantity < 1){
            return res.status(400).json({ error: "La cantidad debe ser mayor a 0" });
        }
        await cart.save();
        res.json({ message: "Cantidad del producto actualizada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



export default router