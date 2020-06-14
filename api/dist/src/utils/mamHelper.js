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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MamHelper = void 0;
var converter_1 = require("@iota/converter");
var core_1 = require("@iota/core");
var mam_js_1 = require("@iota/mam.js");
var crypto_1 = __importDefault(require("crypto"));
var config_local_json_1 = __importDefault(require("../../data/config.local.json"));
/**
 * Class to handle the storage of information on the mam channel
 */
var MamHelper = /** @class */ (function () {
    function MamHelper() {
        this._nodeConfig = config_local_json_1.default.node;
    }
    /**
     * Function to store information on the mam channel
     * @param asciiMessage The message to be stored on the mam channel
     */
    MamHelper.prototype.create = function (asciiMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var mode, channelState, mamMessage, iota, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        mode = "public";
                        channelState = mam_js_1.createChannel(this.generateSeed(81), 2, mode);
                        mamMessage = mam_js_1.createMessage(channelState, converter_1.asciiToTrytes(asciiMessage));
                        // Display the details for the MAM message.
                        console.log("Seed:", channelState.seed);
                        console.log("Address:", mamMessage.address);
                        console.log("Root:", mamMessage.root);
                        console.log("NextRoot:", channelState.nextRoot);
                        iota = core_1.composeAPI({
                            provider: this._nodeConfig.provider
                        });
                        // Attach the message.
                        console.log("Attaching to tangle, please wait...");
                        return [4 /*yield*/, mam_js_1.mamAttach(iota, mamMessage, this._nodeConfig.depth, this._nodeConfig.mwm)];
                    case 1:
                        _a.sent();
                        console.log("You can view the mam channel here https://utils.iota.org/mam/" + mamMessage.root + "/devnet");
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("Could not store the message on the mam channel");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Function for creating iota seeds
     * @param length the length of the seed
     * @returns the generate seed
     */
    MamHelper.prototype.generateSeed = function (length) {
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
        var seed = "";
        while (seed.length < length) {
            var byte = crypto_1.default.randomBytes(1);
            if (byte[0] < 243) {
                seed += charset.charAt(byte[0] % 27);
            }
        }
        return seed;
    };
    return MamHelper;
}());
exports.MamHelper = MamHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFtSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL21hbUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBZ0Q7QUFDaEQsbUNBQXdDO0FBQ3hDLHVDQUF1RTtBQUN2RSxrREFBNEI7QUFDNUIsbUZBQWtEO0FBR2xEOztHQUVHO0FBQ0g7SUFPSTtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsMkJBQU0sQ0FBQyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7T0FHRztJQUNVLDBCQUFNLEdBQW5CLFVBQW9CLFlBQW9COzs7Ozs7O3dCQUkxQixJQUFJLEdBQUcsUUFBUSxDQUFDO3dCQUdoQixZQUFZLEdBQUcsc0JBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFHN0QsVUFBVSxHQUFHLHNCQUFhLENBQUMsWUFBWSxFQUFFLHlCQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzt3QkFFNUUsMkNBQTJDO3dCQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBRTFDLElBQUksR0FBRyxpQkFBVSxDQUFDOzRCQUNwQixRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO3lCQUN0QyxDQUFDLENBQUM7d0JBQ0gsc0JBQXNCO3dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7d0JBRW5ELHFCQUFNLGtCQUFTLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFBOzt3QkFBL0UsU0FBK0UsQ0FBQzt3QkFFaEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrRUFBZ0UsVUFBVSxDQUFDLElBQUksWUFBUyxDQUFDLENBQUM7Ozs7d0JBR3RHLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQzs7Ozs7S0FHekU7SUFFRDs7OztPQUlHO0lBQ0ksZ0NBQVksR0FBbkIsVUFBb0IsTUFBYztRQUM5QixJQUFNLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQztRQUM5QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO1lBQ3pCLElBQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRTtnQkFDZixJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDeEM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUFqRUQsSUFpRUM7QUFqRVksOEJBQVMifQ==