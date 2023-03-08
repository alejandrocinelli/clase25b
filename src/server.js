import express from 'express';
import routes from './routes/index.js';
import session from 'express-session';
import passport from 'passport';
import mongoose from "mongoose";
import exphbs from "express-handlebars";
import invalidUrl from './middlewares/invalidUrl.middleware.js';
import dotenv from 'dotenv';
import { passportStrategy } from './lib/passport.lib.js';
import args from './yargs.js';
import { fileURLToPath } from "url";
import path , { dirname, join } from "path";
import { User } from './models/user.models.js';
import logger from './lib/logger.js';
import os from 'os';
import cluster from 'cluster';



const app = express();

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cpu = os.cpus()

if(cluster.isPrimary && args.mode.toUpperCase() ===  "cluster"){
    cpu.map(() => cluster.fork())
    console.log(`Master ${process.pid} is running`)

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })
    ;
}
else{

app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize()); // inicializamos passport
app.use(passport.session()); // persistent login sessions con esto le digo passport que use nuestras sesiones

passport.use("login", passportStrategy.loginStrategy);
passport.use("register", passportStrategy.registerStrategy);



passport.serializeUser((user, done) => {
  //console.log(user);
  done(null, user._id);
});  
/* 
passport.deserializeUser((user_id, done) => {
    User.findById(user_id)

    });*/

passport.deserializeUser((id, done) => {
    User.findById(id).then((data) => {
        done(null, data);
    })
        .catch((err) => { console.error(err); })
});
    
app.use("/",routes);

// app.use(invalidUrl);

await mongoose.connect(process.env.DATABASE_URl);
logger.info("Database connected!");
console.log("Databe connected!");

const expressServer = app.listen(args.port, () => {
    console.log(`Server listening port ${args.port}`);
    console.log(`Server listening port ${args.mode}`);
    logger.info(`Server listening port ${args.port}`);
})
}

 /*app.listen(3000, () => {
  console.log("Server listening port 3000");

});*/

// "mongodb://localhost:27017/passport"