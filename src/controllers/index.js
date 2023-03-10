import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import passport from 'passport';
import args from "../yargs.js";
import logger from "../lib/logger.js";

const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user;
      logger.info(`Usuario logueado: ${user.username} `);
      return res.render("login-ok", {
        usuario: user.username,
        email: user.email,
      });
    }
  
    res.sendFile(join(__dirname, "../../views/login.html"));
  };

    const getRegister = (req, res) => {
      
        if (req.isAuthenticated()) {
          const user = req.session.user;
          logger.info(`Usuario Registrado: ${user.username} `)
          return res.render("login-ok", {
            usuario: user.username, 
            email: user.email 
          });
        }
        
        res.sendFile(join(__dirname, "../../views/signup.html"));
      };
      

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
    signupFaliure , logout , info , errorReq }