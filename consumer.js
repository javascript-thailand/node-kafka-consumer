const Kafka = require("node-rdkafka");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let clientId = 'dummy-id';

rl.question('Please enter Consumer ID: ', (data) => {
  rl.close();
  clientId = data;
  startConsumer();
});

function startConsumer() {
  let consumer = new Kafka.KafkaConsumer({
    'client.id': clientId,
    'metadata.broker.list': 'localhost:9092',
    'group.id': clientId,
    'enable.auto.commit': false
  });

  let topicName = 'test-topic';

  //logging debug messages, if debug is enabled
  consumer.on('event.log', function (log) {
    console.log(log);
  });

  //logging all errors
  consumer.on('event.error', function (err) {
    console.error('Error from consumer');
    console.error(err);
  });

  consumer.on('ready', function (arg) {
    console.log('consumer ready.' + JSON.stringify(arg));
    consumer.subscribe([topicName]);
    //start consuming messages
    consumer.consume();
  });

  consumer.on('data', function (m) {
    console.log('Consumed: ' + m.value.toString());
    consumer.commit(m);
  });

  //starting the consumer
  consumer.connect();
}