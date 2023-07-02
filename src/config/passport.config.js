import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { createHash, validatePassword } from '../utils.js';
import userModel from '../Dao/models/user.model.js';
import CartController from "../controllers/cart.controllers.js";

const LocalStrategy = local.Strategy;
const cartController = new CartController();

// const initializePassport = () => {
//     passport.use('register', new LocalStrategy(
//         {passReqToCallback:true, usernameField:'email'}, 
//         async (req,username, password,done) =>{
//             const { first_name, last_name, email, age } = req.body;
//             try {
//                 const user = await userModel.findOne({ email:username }); 
//                 if(user){
//                     console.log('El usuario existe');
//                     return done(null, false, { message: 'El usuario ya existe.' });
//                 }
//                 const newUser = {
//                     first_name, 
//                     last_name, 
//                     email, 
//                     age, 
//                     password: createHash(password),
//                 }
//                 const result = await userModel.create(newUser);
//                 return done(null, result, { message: 'Usuario registrado exitosamente' });
//             } catch (error) {
//                 return done("Error al registrar el usuario: " + error);
//             }
//         }
//     ));
//     passport.serializeUser((user,done)=>{
//         done(null, user._id)
//     });
//     passport.deserializeUser( async (id, done)=>{
//         const user = await userModel.findById(id);
//         done(null, user)
//     });
//     passport.use('login', new LocalStrategy({usernameField:'email'}, async (username, password, done)=>{
//         try {
//             const user = await userModel.findOne({email:username})
//             if(!user){
//                 console.log('No existe el usuario');
//                 return done(null, false);
//             };
//             if(!validatePassword(password,user)) return done (null, false);
//             return done(null,user);
//         } catch (error) {
//             return done("Error al intentar ingresar: " + error);
//         }
//     }));
//     passport.use('github', new GitHubStrategy({
//         clientID:'Iv1.8d404415d7c956ee',
//         clientSecret:'aaddafdf749d73f2bf53fb45473024714da1f093',
//         callbackURL:'http://localhost:8080/api/session/githubcallback'
//     }, async(accessToken, refreshToken, profile, done)=>{
//         try{
//             console.log(profile);
//             const user = await userModel.findOne({email: profile._json.email});
//             if(!user){
//                 const createCart = await cartController.createNewCart();
//                 const email = profile._json.email || `${profile._json.name}@github.com`;
//                 const newUser = {
//                     first_name: profile._json.name,
//                     last_name: '',
//                     email: email,
//                     age:18,
//                     password: '',
//                     cart: createCart._id,
//                     role: 'User'
//                 };
//                 const result = await userModel.create(newUser);
//                 done(null, result);
//             }else{
//                 done(null, user);
//             }
//         }catch(error){
//             return done(null, error);
//         };
//     }));
// }

const initializePassport = () => {
    passport.use('register',new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                const user = await userModel.findOne({ email: username });
                if (user) {
                    console.log('El usuario ya existe');
                    return done(null, false, { message: 'El usuario ya existe' });
                }
                const createCart = await cartController.createNewCart();
                user.cart = createCart._id;
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: user.cart,
                    role: 'User'
                };
                const result = await userModel.create(newUser);
                console.log('Usuario registrado exitosamente');
                return done(null, result, { message: 'Usuario registrado exitosamente' });
            } catch (error) {
                return done("Error al registrar el usuario: " + error);
            }
        }));
    passport.serializeUser((user, done) => {done(null, user._id);});
    passport.deserializeUser(async (id, done) => {const user = await userModel.findById(id);done(null, user);});
    passport.use(
        'login',
        new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
            try {
                if (username === 'admin@admin.com' && password === 'admin') {
                    const adminUser = {
                        first_name: 'Admin',
                        last_name: 'Admin',
                        email: username,
                        age: 0,
                        role: 'admin'
                    };
                console.log('Ingreso exitoso como administrador');
                return done(null, adminUser, { message: 'Ingreso exitoso como administrador' });
                }
                const user = await userModel.findOne({ email: username });
                if (!user) {
                    console.log('Usuario no encontrado');
                    return done(null, false, { message: 'Usuario no encontrado' });
                }
                if (!validatePassword(password, user)) {
                    console.log('Contraseña incorrecta');
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }
                console.log('Ingreso exitoso');
                return done(null, user, { message: 'Ingreso exitoso' });
            } catch (error) {
                return done("Error al intentar ingresar: " + error);
            }
        }));
    passport.use('github', new GitHubStrategy({
            clientID: 'Iv1.8d20b7aa9310a471',
            clientSecret: '1ef0f6916f50181ceebc2e6977cb3b7c33e8c033',
            callbackURL: 'http://localhost:8080/api/session/githubcallback'
        }, async (accesToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ email: profile._json.email })
            if (!user) {
              // si tiene mail lo encunetra y carga, sino concatena el usuario con el string
                const email = profile._json.email || `${profile.username}@github.com`;
                const newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        email: email,
                        age: 18,
                        password: '',
                        role: "User"
                }
                const result = await userModel.create(newUser);
                console.log('Usuario registrado exitosamente con GitHub');
                done(null, result, { message: 'Usuario registrado exitosamente con GitHub' });
            } else {
                // ya existe
                done(null, user, { message: 'Inicio de sesión exitoso con GitHub' });
            }
        } catch (error) {
            return done(null, error);
        }
    }))
}

export default initializePassport;