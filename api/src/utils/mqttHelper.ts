import mqtt from "mqtt";
import config from "../data/config.local.json";

/**
 * Class to handle Mqtt functions
 */
export class MqttHelper {

    /**
     * The mqtt client
     */
    public _mqttClient: mqtt.MqttClient;

    /**
     * The mqtt host
     */
    protected readonly _host: string;

    /**
     * The username for the mqtt host/broker
     */
    protected readonly _username: string;

    /**
     * The password for the mqtt host/broker
     */
    protected readonly _password: string;

    /**
     * The feed/topic to subscribe to
     */
    protected readonly _feed: string;

    /**
     * The port to use when connecting to the mqtt host/broker
     */
    protected readonly _port: number;

    constructor() {
        this._mqttClient = null;
        this._host = `mqtts://${config.MQTT_CONFIG.ADAFRUIT_IO_URL}`;
        this._username = config.MQTT_CONFIG.ADAFRUIT_USERNAME;
        this._password = config.MQTT_CONFIG.ADAFRUIT_IO_KEY;
        this._feed = `${config.MQTT_CONFIG.ADAFRUIT_USERNAME}/f/${config.MQTT_CONFIG.ADAFRUIT_IO_FEEDNAME}`;
        this._port = config.MQTT_CONFIG.ADAFRUIT_IO_PORT;
    }

    /**
     * Function to connect to a mqtt host/broker and subscribe to events coming from it
     */
    public connect(): void {

        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        const mqttClient = mqtt.connect(
            this._host, { username: this._username, password: this._password, port: this._port });

        // Mqtt error calback
        mqttClient.on("error", err => {
            console.log(err);
            mqttClient.end();
        });

        // Connection callback
        mqttClient.on("connect", () => {
            console.log(`mqtt client connected`);
        });

        // mqtt subscriptions
        mqttClient.subscribe(this._feed);

        // When a message arrives, console.log it
        mqttClient.on("message", message => {
            console.log(message.toString());
        });

        mqttClient.on("close", () => {
            console.log(`mqtt client disconnected`);
        });
    }

    /**
     * Function  to send messages to the mqtt client/broker
     * @param message The message to be sent
     */
    public sendMessage(message: string | Buffer): void {
        this._mqttClient.publish(this._feed, message);
    }
}
