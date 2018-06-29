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
        // Assigning default options
        options = Object.assign({
            qos: 0,
            timeout: 10,
            onSuccess: () => {
                console.log(`subscribed to: ${topic}`);
            },
            onFailure: (error) => {
                alert(error.errorMessage);
            }
        }, options);

        // subscribing to topic
        this._client.subscribe(topic, options);
    }
}
