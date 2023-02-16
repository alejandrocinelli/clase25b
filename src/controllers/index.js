import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import passport from 'passport';
import args from "../yargs.js";

const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user;
      //console.log(user);
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
          
          return res.render("login-ok", {
            usuario: user.username, 
            email: user.email 
          });
        }
      
        res.sendFile(join(__dirname, "../../views/signup.html"));
      };
      

const loginFaliure = (req, res) => {
    res.render('login-error')
}

const signupFaliure = (req, res) => {
    res.render('signup-error') 
}

const logout = (req, res) => {
    //req.session.destroy() //proba esto despues 
    req.logout(() => {
      return res.sendFile(join(__dirname, "../../views/login.html"));
  })
   //console.log("llega al logout? ")
   //return res.sendFile(join(__dirname, "../../views/login.html")); 
}

const info = (req, res) => { 
    
  res.render("info", {
    entryArgs: JSON.stringify(args),
    platform: process.platform,
    versionNode: process.version,
    memory: process.memoryUsage().rss,
    path: process.execPath,
    processId: process.pid,
    dir: process.cwd(),
}) }

export const authController = { 
    getLogin , 
    getRegister, loginFaliure ,
    signupFaliure , logout , info }