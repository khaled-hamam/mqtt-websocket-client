class Client {
    constructor() {
        this._client = null;
        this.connected = false;
        this.subscriptions = [];
        this.messages = [];

        this.onMessageArrived = (message) => {
            console.log(message);
        }

        this.onConnectionLost = (error) => {
            console.log(error.errorMessage);
        }
    }

    connect({ host, port, clientId, options }) {
        if (this.connected) {  // The client is already connected
            return;
        }

        // changing connected state in onSuccess
        const cached_success = options.onSuccess;  // saving the old function body
        options.onSuccess = () => {
            this.connected = true;
            cached_success();  // using the user given function
        }

        // Creating a new MQTT Client and Connecting to the Broker
        this._client = new Paho.MQTT.Client(host, port, clientId);
        
        // Setting up Listeners
        this._client.onMessageArrived = (message) => {
            // appending the message
            this.messages = [{
                topic: message.topic,
                qos: message.qos,
                payloadString: message.payloadString,
                timestamp: new Date().toLocaleString()
            }, ...this.messages];

            // firing the user callback and sending the last inserted message
            this.onMessageArrived(this.messages[0]);
        }

        this._client.onConnectionLost = this.onConnectionLost;

        this._client.connect(options);
    }

    disconnect() {
        this._client.disconnect();
        console.log('disconnected');
        this.connected = false;
    }

    subscribe(topic, options) {
        // checking duplicate subscriptions
        for (let subscription of this.subscriptions) {
            if (subscription.topic === topic) {
                alert('You are already subscribed to this topic');
                return;
            }
        }

        // Assigning default options
        options = Object.assign({
            qos: 0,
            timeout: 60,
            onSuccess: () => {
                console.log(`subscribed to: ${topic}`);
            },
            onFailure: (error) => {
                alert(error.errorMessage);
            }
        }, options);

        // pushing the new topic to subscriptions in onSuccess
        const cached_success = options.onSuccess;  // saving the old function body
        options.onSuccess = () => {
            this.subscriptions.push({ topic, qos: options.qos });
            cached_success();  // using the user given function
        }

        // subscribing to topic
        this._client.subscribe(topic, options);
    }

    unsubscribe(topic, options) {
        // assigning default options
        options = Object.assign({
            onSuccess: () => {
                console.log(`unsubscribed from: ${topic}`);
            },
            onFailure: (error) => {
                alert(error.errorMessage);
            },
            timeout: 10
        }, options);

        // removing the topic from subscriptions in onSuccess
        const cached_success = options.onSuccess;  // saving the old function body
        options.onSuccess = () => {
            // removing the subscription from the array
            const topicIndex = this.subscriptions.findIndex(i => i.topic === topic);
            this.subscriptions.splice(topicIndex, 1);

            // removing the topic messages
            this.messages = this.messages.filter(message => message.topic !== topic);

            cached_success();  // using the user given function
        }

        this._client.unsubscribe(topic, options);        
    }

    publish({ topic, qos, payload }) {
        let message = new Paho.MQTT.Message(payload);
        message.destinationName = topic;
        message.qos = qos;

        this._client.send(message);
    }
}
