


let QueueWriter =  require('./nsqd');
let Reader = require('./reader')
// NSQD
const nsqdHost = '40.76.70.145'
const nsqdPort = '4150';

// NSQLOOKUPD
const LookupdHTTPAddresses = ['40.76.70.145:4161']
const topic = 'test-topic';
const channel = 'test-channel';


var q = QueueWriter(nsqdHost, nsqdPort, {})
let r = new Reader(LookupdHTTPAddresses, topic, channel);

require('http').createServer((req, res) => {
    return q.publish(topic, 'test message')
    .then(() => {
        res.end('done')
    })

}).listen(3000);
