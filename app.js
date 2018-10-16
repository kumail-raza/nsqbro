


let QueueWriter =  require('./nsqd');
let Reader = require('./reader')

const LookupdHTTPAddresses = ['localhost:4161']
const nsqdHost = 'localhost'
const nsqdPort = '4150';
const topic = 'test-topic';
const channel = 'test-channel';


let q = QueueWriter(nsqdHost, nsqdPort)
let r = new Reader(LookupdHTTPAddresses, topic, channel);

