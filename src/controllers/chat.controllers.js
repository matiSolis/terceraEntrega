import ChatManagerMongo from "../Dao/persistence/chatManagerMongo.js";

const chatManagerMongo = new ChatManagerMongo();

export default class ChatController{
    async getAllMessages (req, res){
        try {
            const messages = await chatManagerMongo.getMessages();
            res.status(200).render('chat', {messages});
        }catch (err) {
            res.status(400).send({
                status: "Error",
                msg: `Los mensajes no se pueden visualizar.`
            });
        };
    };

};