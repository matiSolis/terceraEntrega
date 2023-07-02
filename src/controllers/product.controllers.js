import ProductManagerMongo from "../Dao/managers/mongo/productManagerMongo.js";

const productManagerMongo = new ProductManagerMongo();

export default class ProductController{
    async getProducts (req, res){
        try {
            const products = await productManagerMongo.getProducts();
            res.status(200).send({ products });
        } catch (error) {
            res.status(500).send({ error: 'Error interno del servidor' });
        };
    };
    async getProductById (req, res){
        try {
            const idProduct = req.params.pid;
            const product = await productManagerMongo.getProductById(idProduct);
            res.status(200).send({ product });
        } catch (error) {
            res.status(500).send({ error: 'Error interno del servidor' });
        };
    };
    async addProduct (req,res){
        try {
            const productData = req.body;
            await productManagerMongo.addProduct(productData);
            res.status(200).send({ msg: 'Producto creado exitosamente' });
        } catch (error) {
            res.status(500).send({ error: 'Error interno del servidor' });
        };
    };
    async deleteProductById (req, res){
        try {
            const idProduct = req.params.pid;
            await productManagerMongo.deleteProductById(idProduct);
            res.status(200).send({ msg: 'Producto eliminado exitosamente' });
        } catch (error) {
            res.status(500).send({ error: 'Error interno del servidor' });
        };
    };
    async updateProductById (req, res){
        try {
            const idProduct = req.params.pid;
            const updateData = req.body;
            await productManagerMongo.updateProductById(idProduct, updateData);
            res.status(200).send({ msg: 'Producto actualizado exitosamente' });
            } catch (error) {
                res.status(500).send({ error: 'Error interno del servidor' });
            };
    };
}