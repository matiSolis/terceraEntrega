import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import passport from "passport";
//imports propios
import "./config/dbConnection.js";
import { options } from "./config/options.js";
import __dirname from "./utils.js";
import cartRouter from "./routes/cart.router.js";
import productRouter from "./routes/product.router.js";
import sessionRouter from "./routes/session.router.js";
import adminRouter from "./routes/admin.router.js";
import viewsRouter  from "./routes/views.router.js";
import initializePassport from "./config/passport.config.js";

export const PORT = options.server.port;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(session({
    store: new MongoStore({
        mongoUrl: options.mongoDB.url,
        ttl:3600
    }),
    secret: options.server.secretSession,
    resave: false,
    saveUninitialized: false
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
//vistas
app.use('/',viewsRouter);
app.use('/admin', adminRouter);
app.use('/api/products/', productRouter);
app.use('/api/chat/', productRouter);
app.use('/api/carts/', cartRouter);
app.use('/api/session', sessionRouter);
//server
const server = app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: '+PORT);
});
