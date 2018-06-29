class Client {
    constructor() {
        this._client = null;
        this.connected = false;
    }

    connect({ host, port, clientId, options }) {
        if (this.connected) {  // The client is already connected
            return;
        }

        // changing connected state in onSuccess
        const cached_success = options.onSuccess;
        options.onSuccess = () => {
            cached_success();
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
}