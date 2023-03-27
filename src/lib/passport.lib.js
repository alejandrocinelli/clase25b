// vamos a congifurar passport y las estrategias que vamos a usar
import bcrypt from "bcrypt";
import LocalStrategy from 'passport-local';
import { User } from '../models/user.models.js';
import { Carts } from '../models/car.model.js';

import logger from "./logger.js";
 
// vamos a crear una funcion que nos permita hashear la contraseña
const hashPasword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  // vamos a crear una funcion que nos permita comparar la contraseña
  const validPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
  };

// done es una funcion que se ejecuta cuando la autenticacion es exitosa y me lo trae passport para que yo lo use medio parecido a next en express
// done recibe 3 parametros, el primero es un error, el segundo es el usuario y el tercero es un mensaje
// definimos la estrategia local con la que vamos a autenticar a los usuarios en nuestro sistema con passport

const loginStrategy = new LocalStrategy( async (username, password , done  ) => {

    try {
        const user = await User.findOne({username});
        if(!user || !validPassword(password, user.password)){
            logger.error("Invalid credentials");
            return done("Invalid credentials", null);
        }
        
        done(null, user);

    } catch (error) {
        logger.error(`Error while login in: ${error}`)
        done("Error while login in", null);
    }

})
// con passReqToCallback: true podemos acceder a los datos que vienen en el request y asi poder usarlos en la estrategia

const registerStrategy = new LocalStrategy( { passReqToCallback: true },
    async (req, username, password, done) => {
        
        try {
            const existUser = await User.findOne({username});

            if(existUser){ 
                logger.error("El usuario ya existe");
                return done(null, false, {message: 'El usuario ya existe'})
            }
            
            const newUser = { 
                username,
                password: hashPasword(password),
                email: req.body.email,
                name: req.body.name,
                lastname: req.body.lastname,
                phono : req.body.phono

            }
            const createdUser = await User.create(newUser);
            await Carts.create({ username, products: [] });
            
             req.user = createdUser;
             logger.info(`Usuario creado: ${newUser.username}`);
            return done(null, createdUser);
        }  
        catch (error) {
            logger.error(`Error al buscar usuario: ${error}`);
            done("Error al buscar usuario", null) 
        }

})

export const passportStrategy = {loginStrategy , registerStrategy}




