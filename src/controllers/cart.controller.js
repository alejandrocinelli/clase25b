import CartDaoFactory from '../daos/cartDaoFactory.js'
import {User} from '../models/user.models.js'
import {mailService} from '../services/nodemail.js'
import {smsService} from '../services/smsService.js'
import dotenv from 'dotenv';
import CartDTO from '../dto/cartDTO.js';
import UserDTO from '../dto/userDTO.js';

dotenv.config();


const daoCart = CartDaoFactory.getDao(process.env.db)

const findAllCarts = async (req , res , next) => {
    try {
        const carts = await daoCart.getAll()
        return carts  
    } catch (error) {
        next(error)
    }
}

const findCartById = async (req , res , next) => {
    try {
        
        const {user} = req.session.passport
        const findUsernameById = await User.findById(user)
        const usernameFind = findUsernameById.username
        const cart = await daoCart.getById({ usernameFind })
        const products = cart.products
    return res.render("carrito", {products});
       
        
    } catch (error) {
        throw error
    }
}

const findCartByFilter = async (req, res, next) => {
    try {
        
        const {user} = req.session.passport
        const findUsernameById = await User.findById(user)
        const usernameFind = findUsernameById.username
        const cart = await daoCart.getByFilter({
            username: usernameFind,
        });
        const products = cart.products
       /* if (!user) {
            return res.redirect("/login");
        }*/
        return res.render("carrito", {products});
    } catch (err) {
        console.log(err);
    }
};

const pushCart = async (req, res) => {
    
    const { user } = req.session.passport;
    const newProduct = req.body;
    const findUsernameById = await User.findById(user)
    const usernameFind = findUsernameById.username
    const cart = await daoCart.getByFilter({username: usernameFind,});
    const id  = cart._id
    cart.products.push(newProduct)
    await daoCart.update(id, cart)
    
    return res.render("products", {user});
   }

   const carritoFinish = async (req, res) => {
    const { user } = req.session.passport;
    const findUsernameById = await User.findById(user)
    const usernameFind = findUsernameById.username
    const cart = await daoCart.getByFilter({username: usernameFind});
    const products = cart.products
    //mailService.sendMailCartPurchased(user.email, user.username, products )
    //smsService.sendSms(findUsernameById.phono)
    //smsService.sendWsp(products)
   // console.log(products)

    const userDTO = new UserDTO(usernameFind,findUsernameById.email,findUsernameById.lastname)
    const cartDTO = new CartDTO(products)
    const infoCliente = {
        user: userDTO,
        cart: cartDTO,
      };
      console.log(infoCliente)

    return res.render("finishCart", {products});
}  

export const cartController = { findAllCarts , findCartById , 
    findCartByFilter , pushCart , carritoFinish}