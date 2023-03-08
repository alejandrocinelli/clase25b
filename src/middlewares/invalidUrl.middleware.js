import logger from "../lib/logger.js";

const invalidUrl = (req, res, next) => {
    //logger.error("Error 404");
    res.render("routing-error");
};


export default invalidUrl;
