
import bodyParser from "body-parser";
import express from "express";
import paymentModule from "iota-payment";
import { MqttHelper } from "./utils/mqttHelper";
import { paymentHelper } from "./utils/paymentHelper";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mqttClient = new MqttHelper();
mqttClient.connect();

paymentHelper();

const options = {
    api: true,
    dashboard: true,
    websockets: true
};

const server = paymentModule.createServer(app, options);

// Start server with iota-payment dashboard on '/iotapay' and api on '/iotapay/api'
server.listen(5000, () => {
    console.log(`Server started on http://localhost:5000 `);
    console.info(`Please visit http://localhost:5000/iotapay in your browser`);
});
