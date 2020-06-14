"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentHelper = void 0;
var iota_payment_1 = require("iota-payment");
/**
 * Function to handle payments
 * @param app Node js app
 */
function paymentHelper(app) {
    var options = {
        api: true,
        dashboard: true,
        websockets: true
    };
    var server = iota_payment_1.paymentModule.createServer(app, options);
    // Start server with iota-payment dashboard on '/iotapay' and api on '/iotapay/api'
    server.listen(5000, function () {
        console.log("Server started on http://localhost:5000 ");
        console.info("Please visit http://localhost:5000/iotapay in your browser");
    });
}
exports.paymentHelper = paymentHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9wYXltZW50SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDZDQUE2QztBQUc3Qzs7O0dBR0c7QUFDSCxTQUFnQixhQUFhLENBQUMsR0FBWTtJQUV0QyxJQUFNLE9BQU8sR0FBRztRQUNaLEdBQUcsRUFBRSxJQUFJO1FBQ1QsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsSUFBSTtLQUNuQixDQUFDO0lBRUYsSUFBTSxNQUFNLEdBQUcsNEJBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXhELG1GQUFtRjtJQUNuRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDeEQsT0FBTyxDQUFDLElBQUksQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO0lBQy9FLENBQUMsQ0FBQyxDQUFDO0FBSVAsQ0FBQztBQWxCRCxzQ0FrQkMifQ==