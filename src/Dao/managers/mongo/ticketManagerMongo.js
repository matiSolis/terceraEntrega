import cartModel from "../../models/cart.model.js";
import ticketModel from "../../models/ticket.model.js";
import {code, date} from "../../../utils.js"

export default class TicketManagerMongo{
    async purchaseCart(idCart) {
        const cart = await cartModel.findById(idCart).populate("products.product");
        let totalAmount = 0;
        const productsWithStock = [];
        for (const productInCart of cart.products) {
            const product = productInCart.product;
            if (productInCart.quantity <= product.stock) {
                product.stock -= productInCart.quantity;
                await product.save();
                totalAmount += product.price * productInCart.quantity;
                productsWithStock.push({
                    product: product._id,
                    quantity: productInCart.quantity
                });
            };
        };
        const generateCode = await code();
        const generateDate = await date();
        const ticketData = {
            code: generateCode,
            purchase_dateTime: generateDate,
            amount: totalAmount,
            purchaser: "sarasa@sarasa.com" // pongo esto por default pq al no poder generar user no me crea el schema
        };
        console.log(ticketData);
        const ticket = await ticketModel.create(ticketData);
        if (productsWithStock.length === cart.products.length) {
            cart.products = [];
            await cart.save();
        };
        return ticket;
    };
};