import { Router } from "express";
import passport from "passport";
import { authController } from "../controllers/index.js";
import {ramdonController} from "../controllers/ramdon.controller.js"
import { productController } from "../controllers/product.controller.js";
import { cartController } from "../controllers/cart.controller.js";
import compression from "compression";
const router = Router();

router.get("/", (req, res) => {
    res.send("Ruta raiz");
    }
);

router.get("/login/productos",authController.adminProducts);
//router.post("/login/productos", productController.nuevoProducto);
//router.post("/login/productos", authController.pushCart);
router.post("/login/productos", cartController.pushCart);
router.get("/login",authController.getLogin)
router.post("/login",passport.authenticate("login",{ failureRedirect: "/login-error" }), authController.getLogin  )
router.get("/login/listproducts", productController.getProductos)
router.get("/login/carrito",cartController.findCartByFilter)
//router.get("/login/carrito", authController.getCarrito)
router.get("/login/carrito/finish", cartController.carritoFinish)

router.route("/register")
    .get(authController.getRegister)
    .post(passport.authenticate("register",{ failureRedirect: "/signup-error" }),   authController.getLogin  )

 router.get("/login-error", authController.loginFaliure) 
 router.get("/signup-error", authController.signupFaliure)
 router.get("/logout" , authController.logout  ) 

 router.get("/ramdoms",  ramdonController.getRamdoms )

 router.get("/info", authController.info)
 router.get("/infoCompressed",compression() ,authController.info)

 router.get("*",authController.errorReq );
 

 //router.get("/login/adminproductos", authController.adminProducts);
export default router;