var nsqjs = require('nsqjs');
const delay = duration => new Promise(resolve => setTimeout(() => resolve(), duration));
const _ = require('lodash');
var writer = null;
class QueueWriter {

    constructor(host, port, options = {}) {
        this.queueWriter = new nsqjs.Writer(host, port);
        this.host = host;
        this.port = port;
        this.instanceName = options.instanceName;
        this.connect();
        this.registerTriggersOnEvents();
    }

    publish(topic, data) {
        var body = {
            created_at: new Date().getTime(),
            data: data
        };
        return new Promise((resolve, reject) => {
            this.queueWriter.publish(topic, body, function (err) {
                if (err) {
                    reject({
                        err: err instanceof Error ? err.message : err,
                        topic: topic
                    });
                } else {
                    console.log('message published.')
                    resolve();
                }
            });
        });
    }

    registerTriggersOnEvents() {
        this.queueWriter.on('closed', async () => {

            console.log({
                host: this.host,
                port: this.port,
                message: `ERROR ON CLOSE EVENT`,
                nsqd_event_name: 'close',
                application: this.instanceName
            })
            await delay(1000);
            this.queueWriter.connect();
        });

        this.queueWriter.on('error', err => {
  
            console.log({
                host: this.host,
                port: this.port,
                message: `ERROR!!! CRITICAL ERROR!!`,
                nsqd_event_name: 'error',
                application: this.instanceName,
                error: err instanceof Error ? err.message : err
            });

        });

        this.queueWriter.on('ready', () => {
            console.log({
                host: this.host,
                port: this.port,
                message: `NSQ READY!`,
                application: this.instanceName
            });
        });
    }

    connect() {
        this.queueWriter.connect();
    }

    close() {
        this.queueWriter.close();
    }
}

module.exports = (host, port, options) => {

    if(_.isObject(writer)) {
        return writer;
    }
    console.log('instantiating new nsqwriter')
    writer = new QueueWriter(host, port, options);
    return writer;
};