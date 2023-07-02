import { ContactRepository } from "./user.repository.js";
import {contactsDao} from "../Dao/factory.js";

export const contactsService = new ContactRepository(contactsDao);