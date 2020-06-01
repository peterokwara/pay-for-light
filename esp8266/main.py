# This piece of code awaits for instructions to turn on or off a GPIO pin to control a relay
import os
from umqtt.simple import MQTTClient
import connectWifi
import time
import config
import json
import sys
import machine
from machine import Pin

# connect to wifi
connectWifi.connect()

# set GPIO_2 pin as an output pin
RPin = Pin(2, Pin.OUT, value=0)

# generate a client id
random_num = int.from_bytes(os.urandom(3), 'little')
mqtt_client_id = bytes('client_'+str(random_num), 'utf-8')

# import configuration setup
ADAFRUIT_IO_URL = config.MQTT_CONFIG["ADAFRUIT_IO_URL"]
ADAFRUIT_USERNAME = config.MQTT_CONFIG["ADAFRUIT_USERNAME"]
ADAFRUIT_IO_KEY = config.MQTT_CONFIG["ADAFRUIT_IO_KEY"]
ADAFRUIT_IO_FEEDNAME = config.MQTT_CONFIG["ADAFRUIT_IO_FEEDNAME"]

client = MQTTClient(client_id=mqtt_client_id, server=ADAFRUIT_IO_URL,
                    user=ADAFRUIT_USERNAME, password=ADAFRUIT_IO_KEY, ssl=False)

mqtt_feedname = bytes(
    '{:s}/feeds/{:s}'.format(ADAFRUIT_USERNAME, ADAFRUIT_IO_FEEDNAME), 'utf-8')


def relay_on():

    # Sends a message to the broker that the relay has been turned on, and then turns on the relay.
    send("Relay on")
    RPin.on()


def relay_off():

    # Sends a message to the broker that the relay has been turned off, and then turns off the relay.
    send("Relay off")
    RPin.off()


def send(data):

    # Sends a message to the broker.
    client.publish(mqtt_feedname, json.dumps(data))


def cb(topic, msg):

    # Callback which is called when subscribed data is received.
    print('Received Data:  Topic = {}, Msg = {}'.format(topic, msg))
    command = msg.decode('ASCII')
    if command == "ON":
        relay_on()
    elif command == "OFF":
        relay_off()


def main():

    # Connect to a mqtt server
    try:
        client.connect()
    except Exception as e:
        print('could not connect to MQTT server {}{}'.format(type(e).__name__, e))
        time.sleep(10)
        machine.reset()

    # set the callback
    client.set_callback(cb)

    # subscribe to a given feed name
    client.subscribe(mqtt_feedname)

    # send test message
    send("Is this... now?")

    # check for incoming messages/commands
    while True:
        try:
            if True:
                # Blocking wait for message
                client.wait_msg()
            else:
                # Non-blocking wait for message
                client.check_msg()
                # Then need to sleep to avoid 100% CPU usage (in a real
                # app other useful actions would be performed instead)
                time.sleep(1)
        except OSError as e:
            print('Failed to connect to MQTT broker. Reconnecting...')
            time.sleep(10)
            machine.reset()


if __name__ == "__main__":
    main()
