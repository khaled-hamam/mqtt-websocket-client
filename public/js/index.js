// DOM Elements
const connectionStatus = $('#connection-status'),
      connectionCircle = $('#connection-circle'),
      host             = $('#host-input'),
      port             = $('#port-input'),
      clientId         = $('#client-id-input'),
      keepAlive        = $('#keep-alive-input'),
      userName         = $('#username-input'),
      password         = $('#password-input'),
      connectBtn       = $('#connect-btn'),
      publishTopic     = $('#publish-topic-input'),
      publishQoS       = $('#publish-qos-input'),
      message          = $('#message-input'),
      publishBtn       = $('#publish-btn'),
      subscribeTopic   = $('#subscribe-topic-input'),
      subscribeQoS     = $('#subscribe-qos-input'),
      subscribeBtn     = $('#subscribe-btn'),
      subscriptions    = $('#subscriptions'),
      messages         = $('#messages');


// Setting Default Values
host.val('wss://test.mosquitto.org');
port.val('8081');
clientId.val('mqttjs_' + Math.random().toString(16).substr(2, 8));
keepAlive.val('60');
publishTopic.val('testtopic/1');
subscribeTopic.val('testtopic/1');

// Initializing the Client
const client = new Client();
client.onMessageArrived = (message) => {
    // appending the message to the top of the messages
    messages.prepend(createMessageElement(message));
};

// Configuring Buttons Listeners
(function initializeListeners() {
    // Connect Button Listener
    connectBtn.on('click', () => {
        // disconnect if already connected
        if (client.connected) {
            client.disconnect();
    
            // changing button and header states
            connectBtn.text('Connect');
            connectBtn.removeClass('btn-danger');
            connectBtn.addClass('btn-primary');
            connectionStatus.text('offline');
            connectionCircle.removeClass('green');
            connectionCircle.addClass('red');

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
                connectBtn.removeClass('btn-primary');
                connectBtn.addClass('btn-danger');
                connectionStatus.text('online');
                connectionCircle.removeClass('red');
                connectionCircle.addClass('green');
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
    
    // Subscribe Button Listener
    subscribeBtn.on('click', () => {
        // initializing options object
        const options = {
            qos: parseInt(subscribeQoS.val()),
            onSuccess: () => {
                refreshSubscriptions();
                console.log(`subscribed to: ${subscribeTopic.val()}`);
            }
        }
    
        client.subscribe(subscribeTopic.val(), options);
    });
    
    // Publish Button Listener
    publishBtn.on('click', () => {
        client.publish({
            topic: publishTopic.val(),
            qos: parseInt(publishQoS.val()),
            payload: message.val()
        });
    });
})();

function unsubscribe(topic) {
    const options = {
        onSuccess: () => {
            console.log(`unsubscribed from: ${topic}`);

            // Refreshing the view
            refreshSubscriptions();
            refreshMessages();
        }
    };

    client.unsubscribe(topic, options);
}

// Rerendering the subscriptions view
function refreshSubscriptions() {
    // removing old subscriptions
    subscriptions.empty();

    // adding the current subscriptions
    for (let subscription of client.subscriptions) {
        subscriptions.append(createSubscriptionElement(subscription));
    }
}

// Rerendering the messages view
function refreshMessages() {
    // removing old messages
    messages.empty();

    // adding the current messages
    for (let message of client.messages) {
        messages.append(createMessageElement(message));
    }
}

// Creating the message element
function createMessageElement(message) {
    return (`
        <div class="d-flex flex-column align-items-stretch my-2">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex flex-wrap font-weight-light message-info">
                        <div class="flex-fill">${message.timestamp}</div>
                        <div class="flex-fill"><b>Topic:</b> ${message.topic}</div>
                        <div class="flex-fill"><b>QoS:</b> ${message.qos}</div>
                    </div>
                    <hr />
                    <p class="card-text">${message.payloadString}</p>
                </div>
            </div>
        </div>
    `);
}

// Creating the subscriptionElement
function createSubscriptionElement(subscription) {
    return (`
        <div class="d-flex flex-column align-items-stretch my-2">
            <div class="btn badge badge-pill badge-primary p-2" onclick="unsubscribe('${subscription.topic}')">
                Topic: ${subscription.topic}  |  QoS: ${subscription.qos}
            </div>
        </div>
    `);
}
