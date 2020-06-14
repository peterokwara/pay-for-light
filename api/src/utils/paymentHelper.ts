
import { paymentModule } from "iota-payment";
import { MamHelper } from "./mamHelper";

/**
 * Function to handle payments
 */
export function paymentHelper(): void {

    // start the server with the iota-payment module on
    paymentModule.createServer();

    //Create an event handler which is called, when a payment was successfull
    const onPaymentSuccess =  async payment => {
        console.log("payment success!", payment);

        // send the transaction to the mam channel
        const mamHelper = new MamHelper();
        await mamHelper.create(payment.txInfo);
        // run payment algo
    };

    paymentModule.onEvent("paymentSuccess", onPaymentSuccess);

}
