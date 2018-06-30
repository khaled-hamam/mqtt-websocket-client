class Client {
    constructor() {
        this._client = null;
        this.connected = false;
        this.subscriptions = [];
    }

    connect({ host, port, clientId, options }) {
        if (this.connected) {  // The client is already connected
            return;
        }

        // changing connected state in onSuccess
        const cached_success = options.onSuccess;  // saving the old function body
        options.onSuccess = () => {
            cached_success();  // using the user given function
            this.connected = true;
        }

        // Creating a new MQTT Client and Connecting to the Broker
        this._client = new Paho.MQTT.Client(host, port, clientId);
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
            const topicIndex = this.subscriptions.findIndex(i => i.topic === topic);
            this.subscriptions.splice(topicIndex, 1);
            cached_success();  // using the user given function
        }

        this._client.unsubscribe(topic, options);        
    } 
}
