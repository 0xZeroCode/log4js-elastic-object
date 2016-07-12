var elasticsearch = require('elasticsearch');

function createAppender(layout, config, options, done) {
  var client = elasticsearch.Client({host: config.url});

  var mappings = {
    "properties": {
      "logData": {"type": "object", "dynamic": true},
      "message": {"type": "string"}
    }
  };

  var indexNamePrefix = config.indexNamePrefix || 'log';
  var type = config.typeName || 'log';

  return function(loggingEvent) {
    var currentDate = new Date();
    var dateString = currentDate.getFullYear() + "_" + currentDate.getMonth() + 1 + "_" + currentDate.getDate();

    var index = indexNamePrefix + "_" + dateString;

    loggingEvent.data.forEach(function (element) {
      var log = {
        logDate: loggingEvent.startTime,
        level: loggingEvent.level,
        categoryName: loggingEvent.categoryName
      };

      if(typeof element === 'object') log.logData = element;
      else {
        log.message = element.toString();
      }



      var document = {
        index: index,
        type: type,
        body: log
      };

      return client.index(document)
        .catch(function (error) {
          console.error('eroria ra');
          console.error(error);
        });
    });



  };
}

function configure(config, options, done) {
  return createAppender('object', config, options, done);
}

module.exports.appender = createAppender;
module.exports.configure = configure;
