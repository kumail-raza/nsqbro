'use strict';

const nsq = require('nsqjs');
module.exports = class {

    constructor(lookupdHttpAdresses, topic,channel) {
        this.reader =  new nsq.Reader(topic, channel, {
            lookupdHTTPAddresses: lookupdHttpAdresses,
            maxInFlight: 100,
            maxAttempts: 1
        });
        this.reader.connect();
        this.registerEvents();
    }

    registerEvents() {

        this.reader.on('ready', (msg) => {
            console.log("READY", msg)
        });

        this.reader.on('message', msg => {
            console.log({
                type: 'nsq-gateway',
                success: true,
                message: 'message received at nsq-gateway',
                status: 200,
                payload: msg,
            });

            // got message from nsq

        });

        this.reader.on('error', err => {
            console.log({
                message: 'NSQ connection error on api',
                success: false,
                error: err instanceof Error ? err.message : err
            });
        });

    }
};
