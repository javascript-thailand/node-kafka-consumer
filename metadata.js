var Kafka = require('node-rdkafka');

var producer = new Kafka.Producer({
  'metadata.broker.list': 'localhost:9092',
  'client.id': 'hey',
  'compression.codec': 'snappy'
});

producer.connect()
  .on('ready', function(i, metadata) {
    console.log(i);
    console.log(metadata);
  })
  .on('event.error', function(err) {
    console.log(err);
  });