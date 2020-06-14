"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrytesHelper = void 0;
var converter_1 = require("@iota/converter");
var crypto = __importStar(require("crypto"));
var textHelper_1 = require("./textHelper");
/**
 * Helper functions for use with trytes.
 */
var TrytesHelper = /** @class */ (function () {
    function TrytesHelper() {
    }
    /**
     * Convert an object to Trytes.
     * @param obj The obj to encode.
     * @returns The encoded trytes value.
     */
    TrytesHelper.toTrytes = function (obj) {
        var json = JSON.stringify(obj);
        var encoded = textHelper_1.TextHelper.encodeNonASCII(json);
        return encoded ? converter_1.asciiToTrytes(encoded) : "";
    };
    /**
     * Convert an object from Trytes.
     * @param trytes The trytes to decode.
     * @returns The decoded object.
     */
    TrytesHelper.fromTrytes = function (trytes) {
        if (typeof (trytes) !== "string") {
            throw new Error("fromTrytes can only convert strings");
        }
        // Trim trailing 9s
        var trimmed = trytes.replace(/\9+$/, "");
        if (trimmed.length === 0) {
            throw new Error("fromTrytes trytes does not contain any data");
        }
        var ascii = converter_1.trytesToAscii(trimmed);
        var json = textHelper_1.TextHelper.decodeNonASCII(ascii);
        return json ? JSON.parse(json) : undefined;
    };
    /**
     * Generate a random hash.
     * @param length The length of the hash.
     * @returns The hash.
     */
    TrytesHelper.generateHash = function (length) {
        if (length === void 0) { length = 81; }
        var hash = "";
        while (hash.length < length) {
            var byte = crypto.randomBytes(1);
            if (byte[0] < 243) {
                hash += converter_1.TRYTE_ALPHABET.charAt(byte[0] % 27);
            }
        }
        return hash;
    };
    return TrytesHelper;
}());
exports.TrytesHelper = TrytesHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ5dGVzSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3RyeXRlc0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStFO0FBQy9FLDZDQUFpQztBQUNqQywyQ0FBMEM7QUFFMUM7O0dBRUc7QUFDSDtJQUFBO0lBbURBLENBQUM7SUFsREc7Ozs7T0FJRztJQUNXLHFCQUFRLEdBQXRCLFVBQXVCLEdBQVk7UUFDL0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFNLE9BQU8sR0FBRyx1QkFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMseUJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRDs7OztPQUlHO0lBQ1csdUJBQVUsR0FBeEIsVUFBNEIsTUFBYztRQUN0QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsbUJBQW1CO1FBQ25CLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2xFO1FBRUQsSUFBTSxLQUFLLEdBQUcseUJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxJQUFNLElBQUksR0FBRyx1QkFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7OztPQUlHO0lBQ1cseUJBQVksR0FBMUIsVUFBMkIsTUFBbUI7UUFBbkIsdUJBQUEsRUFBQSxXQUFtQjtRQUMxQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFFZCxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO1lBQ3pCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFO2dCQUNmLElBQUksSUFBSSwwQkFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDL0M7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFuREQsSUFtREM7QUFuRFksb0NBQVkifQ==