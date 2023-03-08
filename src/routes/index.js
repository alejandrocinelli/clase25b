import { Router } from "express";
import passport from "passport";
import { authController } from "../controllers/index.js";
import {ramdonController} from "../controllers/ramdon.controller.js"
import compression from "compression";
const router = Router();

router.get("/", (req, res) => {
    res.send("Ruta raiz");
    }
);
router.get("/login",authController.getLogin)

router.post("/login",passport.authenticate("login",{ failureRedirect: "/login-error" }), authController.getLogin  )

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

export default router;