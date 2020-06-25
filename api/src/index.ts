
import bodyParser from "body-parser";
import express from "express";
import paymentModule from "iota-payment";
import scheduler from "node-schedule";
import { MamHelper } from "./utils/mamHelper";
import { MqttHelper } from "./utils/mqttHelper";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mqttClient = new MqttHelper();
mqttClient.connect();
mqttClient.sendMessage("OFF");

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

const time = () => {
    return new Date();
};

//Create an event handler which is called, when a payment was successfull
const onPaymentSuccess = async payment => {

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
        event: [`User has paid ${payment.txInfo.value} tokens for lights`]
    };

    // send the transaction to the mam channel
    const mamHelper = new MamHelper();

    // send the transaction and event
    await mamHelper.create(transaction);

    setTimeout(async () => {
        // send the event that the lights are now on
        transaction.event.push(`Lights are on ${time()}`);
        await mamHelper.create(transaction);

        // tslint:disable-next-line: align
    }, 3000);

    const seconds: number = payment.txInfo.value * 60000;

    console.log(`Runtime for now is ${seconds}`);

    const startTime = new Date(Date.now());
    const endTime = new Date(startTime.getTime() + seconds);

    await scheduler.scheduleJob({ start: startTime, end: endTime, rule: `*/10 * * * * *` }, () => {
        mqttClient.sendMessage("ON");
        console.log("😊");
    });

    const newEndTime = new Date(endTime.getTime() + 30000);

    await scheduler.scheduleJob({ start: endTime, end: newEndTime, rule: `*/10 * * * * *` }, () => {
        mqttClient.sendMessage("OFF");
        console.log("😐");
    });

    await scheduler.scheduleJob({ start: endTime, end: newEndTime, rule: `*/30 * * * * *` }, async () => {

        // send the event that the lights are now off
        transaction.event.push(`Lights are off ${time()}`);
        await mamHelper.create(transaction);
    });

};

paymentModule.onEvent("paymentSuccess", onPaymentSuccess);
