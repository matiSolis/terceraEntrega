import mongoose from "mongoose";
import {options} from "./options.js";

export const connectDB = async()=>{
    try {
        mongoose.connect(options.mongoDB.url);
        console.log("conexión a la base de datos de manera exitosa");
    } catch (error) {
        console.log(`Hubo un error conectandose a la base ${error}`);
    };
};


