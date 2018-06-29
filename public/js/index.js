// DOM Elements
const connectionStatus = $('#connection-status'),
      host             = $('#host-input'),
      port             = $('#port-input'),
      clientId         = $('#client-id-input'),
      keepAlive        = $('#keep-alive-input'),
      connectBtn       = $('#connect-btn');

// Setting Default Values
host.val('wss://test.mosquitto.org');
port.val('8081');
clientId.val('mqttjs_' + Math.random().toString(16).substr(2, 8));
keepAlive.val('60');

// Configuring Buttons Listeners
connectBtn.on('click', () => {
    alert('connecting...');
});
