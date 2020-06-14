
import bodyParser from "body-parser";
import express from "express";
import paymentModule from "iota-payment";
import { MamHelper } from "./utils/mamHelper";
import { MqttHelper } from "./utils/mqttHelper";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mqttClient = new MqttHelper();
mqttClient.connect();

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

//Create an event handler which is called, when a payment was successfull
const onPaymentSuccess = async payment => {
    console.log("payment success!", payment);

    const transaction = {
        paid: payment.paid,
        type: payment.type,
        value: payment.value,
        address: payment.address,
        index: payment.index,
        id: payment.id,
        txInfo: {
            timestamp: payment.txInfo.timestamp,
            hash: payment.txInfo.hash,
            value: payment.txInfo.value,
            message: payment.txInfo.message
        },
        event: [`User has paid ${payment.txInfo.value} for lights`]
    };

    // send the transaction to the mam channel
    const mamHelper = new MamHelper();

    await mamHelper.create(transaction);

    transaction.event.push(`Lights are on ${Date.now()}`);
    await mamHelper.create(transaction);

    // amount of minutes the lights will be on
    const minutes = payment.txInfo.value * 60000;

    // repeat with the interval of 30 seconds
    const timerId = setInterval(() => {
        mqttClient.sendMessage("ON");

        // tslint:disable-next-line: align
    }, 20000);

    // after 5 seconds stop
    setTimeout(() => { clearInterval(timerId); }, minutes);

    transaction.event.push(`Lights are off ${Date.now()}`);
    await mamHelper.create(transaction);
    // // run payment algo
    // setTimeout(async () => {

    //     transaction.event.push(`Lights are on`);
    //     await mamHelper.create(transaction);

    //     // keep it on by sending the on message every 30 seconds
    //     setTimeout(() => {
    //         mqttClient.sendMessage("ON");
    //         // tslint:disable-next-line: align
    //     }, 500);

    //     // tslint:disable-next-line: align
    // }, minutes);

    mqttClient.sendMessage("OFF");

};

paymentModule.onEvent("paymentSuccess", onPaymentSuccess);
