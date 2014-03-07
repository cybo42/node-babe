var
    bunyan = require('bunyan')
    , defaultLogLevel = process.env.LOG_LEVEL || 'info'
    , defaultStream = process.stdout
    , defaultLogger = bunyan.createLogger({name: 'app', stream: defaultStream, level: defaultLogLevel})
;

var bunyanLevelNameToCode = {
    'trace': 10,
    'debug': 20,
    'info' : 30,
    'warn' : 40,
    'error': 50,
    'fatal': 60,
};

var bunyanLevelCode2Name = {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal'
};

var namedStreams = {
    default: defaultStream
};

var namedLoggers = {
    default: defaultLogger
};

var logLevels = {
    default: defaultLogLevel
};

var resolveStream = function resolveStream(stream){
    return ((typeof stream === 'object') && stream) || (typeof stream === 'string' && namedStreams[stream]) || defaultStream;
};

var buildLoggerOptions = function buildLoggerOptions(name, resolvedLevel, resolvedStream) {
    var options = {name: name, level: resolvedLevel};

    if(resolvedStream instanceof Array){
        options.streams = resolvedStream;
    }else{
        options.stream = resolvedStream;
    }

    return options;
};

function resolveEnvLevel(name){
    return process.env['LOG_LEVEL_' + name] || process.env.LOG_LEVEL;
}

function resolveLevel(level, name) {
    return level || logLevels[name] || defaultLogLevel;
}

function fetchPredefinedLogger(name, logSrc){
    var predefinedLogger = namedLoggers[name || "default"];

    if(predefinedLogger){
        predefinedLogger.src = logSrc;
        return predefinedLogger;
    }

    return predefinedLogger;
}

function createNewLogger(name, resolvedLevel, resolvedStream){
    var options = buildLoggerOptions(name, resolvedLevel, resolvedStream);
    var newLogger = bunyan.createLogger(options);
    var logSrc = 'true' ===(process.env['LOG_SRC_' + name] || process.env.LOG_SRC);

    if(bunyanLevelNameToCode[resolvedLevel] !== newLogger.level()){
        newLogger.level(resolvedLevel);
    }

    namedLoggers[name] = newLogger;
    logLevels[name] = resolvedLevel;

    newLogger.src = logSrc;
    return newLogger;
}

// ======================== EXPORTS ===================================================================================
module.exports.addStream = function addStream(name, stream){
    if(name === 'default'){
        defaultStream = stream;
    }
    namedStreams[name] = stream;
};

var getLogger = module.exports.getLogger = function getLogger(name, level, stream){
    var resolvedStream = resolveStream(stream);
    var resolvedLevel = resolveEnvLevel(name) || resolveLevel(level, name);

    var logSrc = 'true' ===(process.env['LOG_SRC_' + name] || process.env.LOG_SRC);

    return fetchPredefinedLogger(name, logSrc) || createNewLogger(name, resolvedLevel, resolvedStream);

};

module.exports.getLoggerInfo = function getLogInfo(){
    return Object.keys(logLevels).map(function(name){
        return {name: name, level: logLevels[name], active: !!(namedLoggers[name])};
    });
};


module.exports.getStreamInfo = function getLogInfo(){
    return Object.keys(namedStreams).map(function(name){
        return {name: name, stream: namedStreams[name]};
    });
};

var setLogLevel = module.exports.setLogLevel = function setLogLevel(level, name){
    if(name){
        if(namedLoggers[name]){
            namedLoggers[name].level(level);
        }

        logLevels[name] = level;

        if(name === 'default'){
            defaultLogLevel = level;
        }

        return level;

    }else{
        Object.keys(namedLoggers).forEach(function(logName){
            setLogLevel(level, logName);
        });

        return level;
    }
};

