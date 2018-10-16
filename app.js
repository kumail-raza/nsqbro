


let QueueWriter =  require('./nsqd');
let Reader = require('./reader')
// NSQD
const nsqdHost = 'localhost'
const nsqdPort = '4150';

// NSQLOOKUPD
const LookupdHTTPAddresses = ['localhost:4161']
const topic = 'test-topic';
const channel = 'test-channel';


let r = new Reader(LookupdHTTPAddresses, topic, channel);

require('http').createServer((req, res) => {
    new QueueWriter(nsqdHost, nsqdPort, {})
    .publish(topic, 'test message')
    .then(() => {
        res.end('done')
    })

}).listen(3000);
