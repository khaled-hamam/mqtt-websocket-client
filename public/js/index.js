// DOM Elements
const connectionStatus = $('#connection-status'),
      host             = $('#host-input'),
      port             = $('#port-input'),
      clientId         = $('#client-id-input'),
      keepAlive        = $('#keep-alive-input'),
      userName         = $('#username-input'),
      password         = $('#password-input'),
      connectBtn       = $('#connect-btn');

// Setting Default Values
host.val('wss://test.mosquitto.org');
port.val('8081');
clientId.val('mqttjs_' + Math.random().toString(16).substr(2, 8));
keepAlive.val('60');

// Initializing the Client
const client = new Client();

// Configuring Buttons Listeners
connectBtn.on('click', () => {
    // disconnect if already connected
    if (client.connected) {
        client.disconnect();

        // changing button and header states
        connectBtn.text('Connect');
        connectionStatus.text('offline');

        return;
    }

    // initializing the Options object
    const options = {
        timeout: 3,
        keepAliveInterval: parseInt(keepAlive.val()),
        onSuccess: () => {
            console.log('connected');

            // changing button and header states
            connectBtn.text('Disconnect');
            connectionStatus.text('online');
        },
        onFailure: (error) => {
            alert(error.errorMessage);
        }
    };

    // Checking the username and password
    if (userName.val()) {
        options = {
            ...options,
            userName: userName.val(),
            password: password.val()
        };
    }

    // Connecting
    client.connect({
        host: host.val(),
        port: parseInt(port.val()),
        clientId: clientId.val(),
        options
    });
});
