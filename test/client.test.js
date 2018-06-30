assert = chai.assert;

describe('Client Tests', function() {
    let client = new Client();

    // Making a connection before running any test
    this.beforeAll(done => {
        client.connect({
            host: 'wss://test.mosquitto.org',
            port: 8081,
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
            options: {
                timeout: 3,
                keepAliveInterval: 60,
                onSuccess: () => {
                    done();
                },
                onFailure: (error) => {
                    done();
                }
            }
        });
    });

    describe('Connection Test', function() {
        it('Client should connect', function(done) {
            assert.equal(client.connected, true);
            done();
        });
    });

    describe('Subscription Tests', function() {
        it('Client should subscribe', function(done) {
            client.subscribe('testtopic/1', { 
                qos: 1,
                onSuccess: () => {
                    assert.equal(client.subscriptions[0].topic, 'testtopic/1');
                    done();
                },
                onFailure: () => {
                    assert(false);
                    done();
                }
            });
        });

        it('Client should unsubscribe', function(done) {
            client.unsubscribe('testtopic/1', {
                onSuccess: () => {
                    assert.equal(client.subscriptions.length, 0);
                    done();
                },
                onFailure: () => {
                    assert(false);
                    done();
                }
            });
        });
    });

    describe('Publishing Test', function() {
        it('Client should publish a message', function(done) {
            client.subscribe('testtopic/1', { 
                qos: 1,
                onSuccess: () => {
                    client.onMessageArrived = (message) => {
                        assert.equal(message.payloadString, 'Hello Tests');
                        done();
                    }
        
                    client.publish({
                        topic: 'testtopic/1',
                        qos: 0,
                        payload: 'Hello Tests'
                    });
                }
            });
        });
    });

    describe('Disconnetcing Test', function() {
        it('Client should disconnect', function(done) {
            client.disconnect();
            assert.equal(client.connected, false);
            done();
        });
    });
});
