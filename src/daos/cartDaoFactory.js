import CartMongoDao from './cartMongo.dao.js'

export default class CartDaoFactory {
  
  static getDao(db) {
    switch (db) {
      case "MONGO":
        return CartMongoDao.getInstance();
      case "MYSQL":
          return  new Error("No implementado");  
    }
 
}
}