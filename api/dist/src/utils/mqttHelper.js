"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttHelper = void 0;
var mqtt_1 = __importDefault(require("mqtt"));
var config_local_json_1 = __importDefault(require("../../data/config.local.json"));
/**
 * Class to handle Mqtt functions
 */
var MqttHelper = /** @class */ (function () {
    function MqttHelper() {
        this._mqttClient = null;
        this._host = "mqtts://" + config_local_json_1.default.MQTT_CONFIG.ADAFRUIT_IO_URL;
        this._username = config_local_json_1.default.MQTT_CONFIG.ADAFRUIT_USERNAME;
        this._password = config_local_json_1.default.MQTT_CONFIG.ADAFRUIT_IO_KEY;
        this._feed = config_local_json_1.default.MQTT_CONFIG.ADAFRUIT_USERNAME + "/f/" + config_local_json_1.default.MQTT_CONFIG.ADAFRUIT_IO_FEEDNAME;
        this._port = config_local_json_1.default.MQTT_CONFIG.ADAFRUIT_IO_PORT;
    }
    /**
     * Function to connect to a mqtt host/broker and subscribe to events coming from it
     */
    MqttHelper.prototype.connect = function () {
        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        var mqttClient = mqtt_1.default.connect(this._host, { username: this._username, password: this._password, port: this._port });
        // Mqtt error calback
        mqttClient.on("error", function (err) {
            console.log(err);
            mqttClient.end();
        });
        // Connection callback
        mqttClient.on("connect", function () {
            console.log("mqtt client connected");
        });
        // mqtt subscriptions
        mqttClient.subscribe(this._feed);
        // When a message arrives, console.log it
        mqttClient.on("message", function (message) {
            console.log(message.toString());
        });
        mqttClient.on("close", function () {
            console.log("mqtt client disconnected");
        });
    };
    /**
     * Function  to send messages to the mqtt client/broker
     * @param message The message to be sent
     */
    MqttHelper.prototype.sendMessage = function (message) {
        this._mqttClient.publish(this._feed, message);
    };
    return MqttHelper;
}());
exports.MqttHelper = MqttHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXF0dEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9tcXR0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhDQUF3QjtBQUN4QixtRkFBa0Q7QUFFbEQ7O0dBRUc7QUFDSDtJQWdDSTtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBVywyQkFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFpQixDQUFDO1FBQzdELElBQUksQ0FBQyxTQUFTLEdBQUcsMkJBQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUM7UUFDdEQsSUFBSSxDQUFDLFNBQVMsR0FBRywyQkFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7UUFDcEQsSUFBSSxDQUFDLEtBQUssR0FBTSwyQkFBTSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsV0FBTSwyQkFBTSxDQUFDLFdBQVcsQ0FBQyxvQkFBc0IsQ0FBQztRQUNwRyxJQUFJLENBQUMsS0FBSyxHQUFHLDJCQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDO0lBQ3JELENBQUM7SUFFRDs7T0FFRztJQUNJLDRCQUFPLEdBQWQ7UUFFSSxxRkFBcUY7UUFDckYsSUFBTSxVQUFVLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FDM0IsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUUxRixxQkFBcUI7UUFDckIsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQSxHQUFHO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBRUgsc0JBQXNCO1FBQ3RCLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFxQjtRQUNyQixVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQyx5Q0FBeUM7UUFDekMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBQSxPQUFPO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZ0NBQVcsR0FBbEIsVUFBbUIsT0FBd0I7UUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBakZELElBaUZDO0FBakZZLGdDQUFVIn0=