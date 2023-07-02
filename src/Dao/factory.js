import {options} from "../config/config.js";

const persistence = options.server.persistence;
let contactsDao;

switch (persistence) {
    case "mongo":
        const {connectDB} = await import("../config/dbConnection.js");
        connectDB();
        const {ContactsMongo} = await import("./managers/mongo/userManagerMongo.js")
        contactsDao = new ContactsMongo();
    break;
    case "memory":
    break;
    case "sql":
        break;
};

export {contactsDao}