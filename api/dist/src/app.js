"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var iota_payment_1 = __importDefault(require("iota-payment"));
var mqttHelper_1 = require("./utils/mqttHelper");
var paymentHelper_1 = require("./utils/paymentHelper");
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
var mqttClient = new mqttHelper_1.MqttHelper();
mqttClient.connect();
paymentHelper_1.paymentHelper();
var options = {
    api: true,
    dashboard: true,
    websockets: true
};
var server = iota_payment_1.default.createServer(app, options);
// Start server with iota-payment dashboard on '/iotapay' and api on '/iotapay/api'
server.listen(5000, function () {
    console.log("Server started on http://localhost:5000 ");
    console.info("Please visit http://localhost:5000/iotapay in your browser");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDREQUFxQztBQUNyQyxvREFBOEI7QUFDOUIsOERBQXlDO0FBQ3pDLGlEQUFnRDtBQUNoRCx1REFBc0Q7QUFFdEQsSUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0FBRXRCLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRW5ELElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO0FBQ3BDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUVyQiw2QkFBYSxFQUFFLENBQUM7QUFFaEIsSUFBTSxPQUFPLEdBQUc7SUFDWixHQUFHLEVBQUUsSUFBSTtJQUNULFNBQVMsRUFBRSxJQUFJO0lBQ2YsVUFBVSxFQUFFLElBQUk7Q0FDbkIsQ0FBQztBQUVGLElBQU0sTUFBTSxHQUFHLHNCQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUV4RCxtRkFBbUY7QUFDbkYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7SUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0lBQ3hELE9BQU8sQ0FBQyxJQUFJLENBQUMsNERBQTRELENBQUMsQ0FBQztBQUMvRSxDQUFDLENBQUMsQ0FBQyJ9