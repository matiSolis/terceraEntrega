import{fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

//hash password
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);

export const date = async () =>{
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const dateInfo = `Fecha: ${date} - Hora: ${time}`;
    return dateInfo;
};
export const code = async () =>{
    const code = uuidv4();
    return code;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname