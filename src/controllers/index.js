import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import passport from 'passport';
import args from "../yargs.js";
import logger from "../lib/logger.js";

import {mailService} from "../services/nodemail.js";
import { Carts } from '../models/car.model.js';
import { User } from '../models/user.models.js';

import {smsService} from "../services/smsService.js";


const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user;
      logger.info(`Usuario logueado: ${user.username} `);
      mailService.sendMail(user.email, user.username  )
      return res.render("login-ok", {
        usuario: user.username,
        email: user.email,
        name : user.name,
        lastname : user.lastname,
      });
    }
  
    res.sendFile(join(__dirname, "../../views/login.html"));
  };

const getRegister = (req, res) => {
      
        if (req.isAuthenticated()) {
          const user = req.session.user;
          logger.info(`Usuario Registrado: ${user.username} `)
          //mailService.sendMail(user.email, user.username  )
                 
          return res.render("login-ok", {
            usuario: user.username, 
            email: user.email,
             name : user.name,
             lastname : user.lastname,
          });
        }
        
        res.sendFile(join(__dirname, "../../views/signup.html"));
      };
      

const adminProducts = (req, res) => {
        const { user } = req.session.passport;
               
        if(!user){
            return res.redirect("/login");
        }
        logger.info(`Usuario logueado: ${user} `);
        
        logger.info(`Usuario logueado: ${user.username} `);
        return res.render("products", {user});
   }  

const pushCart = async (req, res) => {
    const { user } = req.session.passport;
    const newProduct = req.body;
    const findUsernameById = await User.findById(user)
    const usernameFind = findUsernameById.username

    const cart = await Carts.findOne({ username: usernameFind})
    cart.products.push(newProduct)
    await Carts.updateOne({username: usernameFind}, cart)
    
    return res.render("products", {user});
   }

const getCarrito = async (req, res) => {
    const { user } = req.session.passport;
    
    //const findUsernameById = await findOne({_id: user}) 
    const findUsernameById = await User.findById(user)
    
    const usernameFind = findUsernameById.username
    const cart = await Carts.findOne({ username: usernameFind })
    
    const products = cart.products
    return res.render("carrito", {products});
  }

const carritoFinish = async (req, res) => {
    const { user } = req.session.passport;
    const findUsernameById = await User.findById(user)
    const usernameFind = findUsernameById.username
    const cart = await Carts.findOne({ username: usernameFind })
    const products = cart.products
    mailService.sendMailCartPurchased(user.email, user.username, products )
    smsService.sendSms(findUsernameById.phono)
    //smsService.sendWsp(products)

    return res.render("finishCart", {products});
}  


const loginFaliure = (req, res) => {
    logger.error("Error en el login");
    res.render('login-error')
}

const signupFaliure = (req, res) => {
    logger.error("Error en el registro");
    res.render('signup-error') 
}

const logout = (req, res) => {
    //req.session.destroy() //proba esto despues 
    logger.info("Usuario deslogueado ")
    req.logout(() => {
      return res.sendFile(join(__dirname, "../../views/login.html"));
  })
   //console.log("llega al logout? ")
   //return res.sendFile(join(__dirname, "../../views/login.html")); 
}

const info = (req, res) => { 
    logger.info("Ingreso a la ruta info")
    res.render("info", {
    entryArgs: JSON.stringify(args),
    platform: process.platform,
    versionNode: process.version,
    memory: process.memoryUsage().rss,
    path: process.execPath,
    processId: process.pid,
    dir: process.cwd(),
}) }

const errorReq = (req, res) => {
    logger.error("Error 4044");
    res.render("routing-error");
  };

export const authController = { 
    getLogin , 
    getRegister, loginFaliure ,
    signupFaliure , logout , info , errorReq , adminProducts,
    pushCart , getCarrito , carritoFinish}