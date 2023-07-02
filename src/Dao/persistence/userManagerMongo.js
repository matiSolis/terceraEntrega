import userModel from "../models/user.model.js"
import CartManagerMongo from "./cartManagerMongo.js";
import { createHash } from '../../utils.js';

const cartManagerMongo = new CartManagerMongo();

export default class UserManagerMongo {
    async addUser(firstName, lastName, age, email, password, role){
        const cartUser = await cartManagerMongo.createNewCart();
        const cartId = cartUser._id;
        if (!firstName || !lastName || !age || !email || !password || !role ) {
            throw new Error(`Faltan datos`);
        };
        const newUser = {
            firstName,
            lastName,
            age,
            email,
            password:  createHash(password),
            cartId,
            role
        };
        const result = await userModel.create(newUser);
        return result;
    };
    async addUserGitHub(profile){
        const cartUser = await cartManagerMongo.createNewCart();
        const cartId = cartUser._id;
        const newUser = {
            firstName: profile._json.name,
            lastName: '',
            email: profile._json.email,
            age:18,
            password: '',
            cart: cartId,
            role: 'User'
        };
        const result = await userModel.create(newUser);
        return result;
    };
    async findUserByEmail(username){
        const user = await userModel.findOne({email:username});
        return user;
    };
    async findUserById(id){
        const user = await userModel.findById(id);
        return user;
    };
    async findUserByJsonEmail(profile){
        const user = await userModel.findOne({email: profile._json.email});
        return user;
    };
};