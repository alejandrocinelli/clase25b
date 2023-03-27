import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import passport from "passport";
import { Product } from '../models/product.model.js';

const nuevoProducto = async (req, res) => {

   const nuevoPro = req.body;

    const producto = new Product(nuevoPro);

    const productoSalvado = await producto.save()

    //res.json(productoSalvado);
    res.render('products', {productoSalvado});
}

const getProductos = async (req, res) => {
    
    try {
      // const { user } = req.session.passport;
   
   /* if(!user){
        return res.redirect("/login");
    }*/

   const productos = await Product.find().lean();
   //console.log(productos);
    //res.json(productos);
    res.render('listProducts', {productos});
    } catch (error) {
        console.log(error);
    }
    
    
}

export const productController = { nuevoProducto , getProductos }