# log4js-elastic-object

[![NPM](https://nodei.co/npm/log4js-elastic-object.png)](https://nodei.co/npm/log4js-elastic-object/)

log4js elasticsearch appender. log object is saved as object in elasticsearch.

log4js configure:

variant 1: 
```
var log4js = require('log4js');

var esAppenderConfig = {
    url: 'http://localhost:9200',
    typeName: 'log' //default
    indexNamePrefix: 'log'  //default
};

var objectAppender = require('log4js-elastic-object').configure(esAppenderConfig);

log4js.addAppender(objectAppender, 'tests');
```

variant 2: 
```
log4js.configure({
    "appenders": [
            {
                "category": "tests",
                "type": "logLevelFilter",
                "level": "INFO",
                "appender": {
                    "type": "log4js-elastic-object",
                    "url": "http://localhost:9200",
                    "typeName": "log"
                    "indexNamePrefix": "log"
                }
            },
            {
                "category": "tests",
                "type": "console"
            }
        ],
    "levels": {
            "tests":  "DEBUG"
        }

});
```

usage:
```
var logger = log4js.getLogger('tests');

logger.info({name: "test", ip: "127.0.0.1"}); //any object. so for error, warn, info etc.

logger.info("any text");
```

when you log object, document, inserted in elasticsearch, has fields: logDate, level, categoryName, logData. logData is that object.

when you log text, document has fields: logDate, level, categoryName, message. message is that text.

you can log ES6 class instances too.
