import CartManagerMongo from "../Dao/persistence/cartManagerMongo.js";

const cartManagerMongo = new CartManagerMongo();

export default class CartController{
    async getAllCarts (req, res) {
        try {
            const result = await cartManagerMongo.getAllCarts();
            res.status(200).send({
                status: "success",
                result
            });
        }catch(error){
            res.status(400).send({
                status: "Error",
                msg: `El total de carritos no se puede visualizar.`
            });
        };
    };
    async getCartById (req, res) {
        try{
            const idCart = req.params.cid;
            const result = await cartManagerMongo.getCartById(idCart);
            return res.status(200).send({
                status: "success",
                result
            });
        }catch (error) {
            res.status(400).send({
                status: "Error",
                msg: `El carrito solicitado no se puede visualizar.`
            });
        };
    };
    async getDetailsInCart (req, res) {
        try {
            const idCart = req.params.cid;
            const result = await cartManagerMongo.getDetailsInCart(idCart);
            return res.status(200).send({
                status: "success",
                result
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Error al obtener los detalles del carrito.' });
        };
    };
    async createNewCart (req, res) {
        try{
            const result = await cartManagerMongo.createNewCart();
            res.status(200).send({
                status: "success",
                result
            });
        }catch (error) {
            res.status(400).send({
                status: "Error",
                msg: `El carrito solicitado no se puede crear.`
            });
        };
    };
    async addProductInCart (req, res) {
        try {
            const idCart = req.params.cid;
            const idProduct = req.params.pid;
            const result = await cartManagerMongo.addProductInCart(idCart, idProduct);
            return res.status(200).send({
                status: "success",
                result
            });
        } catch (error) {
            res.status(400).send({
                status: "Error",
                msg: `El producto solicitado no se puede agregar en el carrito indicado.`
            });
        };
    };
    async clearCart (req, res) {
        try {
            const idCart = req.params.cid;
            await cartManagerMongo.clearCart(idCart);
            res.status(200).send({
                status: "Success",
                msg: "Carrito vaciado exitosamente"
            });
        } catch (error) {
            res.status(400).send({
                status: "Error",
                msg: "No se puede vaciar el carrito"
            });
        };
    };
    async updateProductQuantity (req, res) {
        try {
            const idCart = req.params.cid;
            const idProduct = req.params.pid;
            const quantity = req.body.quantity;
            await cartManagerMongo.updateProductQuantity(idCart, idProduct, quantity);
            res.status(200).send({
                status: "success",
                msg: "Cantidad del producto actualizada exitosamente"
            });
        } catch (error) {
            res.status(400).send({
                status: "Error",
                msg: "No se puede actualizar la cantidad del producto en el carrito"
            });
        };
    };
    async addProductsToCart (req, res) {
        try {
            const idCart = req.params.cid;
            const products = req.body;
            await cartManagerMongo.addProductsToCart(idCart, products);
            res.status(200).send({
                status: 'success',
                message: 'Productos agregados al carrito exitosamente',
            });
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: 'No se pudieron agregar los productos al carrito',
            });
        }
    };
};