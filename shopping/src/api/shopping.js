const ShoppingService = require("../services/shopping-service");
const UserAuth = require('./middlewares/auth');
const { PublishCustomerEvent, SuscribeMessage, PublishMessage } = require("../utils");
const { CUSTOMER_BINDING_KEY } = require("../config");

module.exports = (app, channel) => {

    const service = new ShoppingService();
    SuscribeMessage(channel, service);

    app.post('/order', UserAuth, async (req, res, next) => {

        const { _id } = req.user;
        const { txnNumber } = req.body;

        try {
            const { data } = await service.PlaceOrder({ _id, txnNumber });
            const { data: payload } = await service.GetOrderPayload(_id, data, 'CREATE_ORDER')

            // PublishCustomerEvent(payload)
            PublishMessage(channel, CUSTOMER_BINDING_KEY, JSON.stringify(payload))

            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/orders', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        try {
            const { data } = await service.GetOrders(_id)
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }

    });


    app.get('/cart', UserAuth, async (req, res, next) => {

        const { _id } = req.user;
        try {
            const { data } = await service.getCart(_id);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    });
}