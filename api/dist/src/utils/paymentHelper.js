"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentHelper = void 0;
var iota_payment_1 = require("iota-payment");
var mamHelper_1 = require("./mamHelper");
/**
 * Function to handle payments
 */
function paymentHelper() {
    var _this = this;
    // start the server with the iota-payment module on
    iota_payment_1.paymentModule.createServer();
    //Create an event handler which is called, when a payment was successfull
    var onPaymentSuccess = function (payment) { return __awaiter(_this, void 0, void 0, function () {
        var mamHelper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("payment success!", payment);
                    mamHelper = new mamHelper_1.MamHelper();
                    return [4 /*yield*/, mamHelper.create(payment.txInfo)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    iota_payment_1.paymentModule.onEvent("paymentSuccess", onPaymentSuccess);
}
exports.paymentHelper = paymentHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9wYXltZW50SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZDQUE2QztBQUM3Qyx5Q0FBd0M7QUFFeEM7O0dBRUc7QUFDSCxTQUFnQixhQUFhO0lBQTdCLGlCQWlCQztJQWZHLG1EQUFtRDtJQUNuRCw0QkFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRTdCLHlFQUF5RTtJQUN6RSxJQUFNLGdCQUFnQixHQUFJLFVBQU0sT0FBTzs7Ozs7b0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBR25DLFNBQVMsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztvQkFDbEMscUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUE7O29CQUF0QyxTQUFzQyxDQUFDOzs7O1NBRTFDLENBQUM7SUFFRiw0QkFBYSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBRTlELENBQUM7QUFqQkQsc0NBaUJDIn0=