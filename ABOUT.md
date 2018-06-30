## What I wanted to accomplish:

The project is made to be a clone for a Websockets MQTT Client (can be found [here](http://www.hivemq.com/demos/websocket-client/)) that's able to connect to brokers, subscribe to topics, and publish messages.

I chose to focus on the main points the real application serves:
1. Connection options that are not included:
    * Last-Will options
    * Clean Session Option
2. Publishing options that are not included:
    * Retain message option


## My though process:
1. Figuring out what is MQTT and it's main terminology.
2. Understand how the original application of Hivemq is working.
3. Figuring out tha main libraries and technologies I'm going to use.
4. Learning to use the MQTT Library I chose (Paho-MQTT)
5. Writing down how the application is going to work and the needed structures.
6. Learning how to test the code
7. Learn about Continous Integration using Travis CI


## What I Learned:
1. MQTT and it's main terminology.
2. Got Familiar with Bootstrap 4.
3. Using Mocha for client side js testing.
4. Running tests from console using headless chrome with mocha-chrome package.
5. Continous Integration using Travis CI


## Why I chose NodeJS:
I chose NodeJS basically because there wasn't much backend involved in the application, most of the job was from the front-end so there was no priority on a technology over the other.
I mostly chose NodeJS because I'm familiar to it.

I consider my self a **beginner** in NodeJS.
