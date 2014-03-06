
describe("babe tests", function () {
    'use strict';
    var ASYNC_TIMEOUT = 1000;

    var babePath = '../lib/babe';
    var babe = require(babePath);

    function CaptureStream(messages){
        this.messages = messages || [];
    }

    CaptureStream.prototype.write = function(message){
        this.messages.push(message);
    };

    CaptureStream.prototype.reset = function(){
        this.messages = [];
    };

    CaptureStream.prototype.getMessages = function(){
        return this.messages;
    };

    beforeEach(function(){
        // Reload the module since it is in the require cache

        var resolvedPath = require.resolve(babePath);
        delete require.cache[resolvedPath];
        babe = require(babePath);
    });

    describe("basic tests", function(){
        it("Should return a proper bunyan logger", function(){
            var logger = babe.getLogger();
            expect(logger).toEqual(jasmine.any(Object));
            expect(logger.trace).toEqual(jasmine.any(Function));
            expect(logger.debug).toEqual(jasmine.any(Function));
            expect(logger.info).toEqual(jasmine.any(Function));
            expect(logger.warn).toEqual(jasmine.any(Function));
            expect(logger.error).toEqual(jasmine.any(Function));
            expect(logger.fatal).toEqual(jasmine.any(Function));
        });

        it("should log with default settings", function(){
            var logger = babe.getLogger();
            expect(logger.fields.name).toEqual('app');
            expect(logger.level()).toEqual(30);
            expect(logger.streams).toEqual(jasmine.any(Array));
            expect(logger.streams.length).toEqual(1);
            expect(logger.streams[0].stream).toEqual(process.stdout);
        });

        it("should return a named logger", function(){
            var logger = babe.getLogger("requestLogger");
            expect(logger.fields.name).toEqual('requestLogger');
            expect(logger.level()).toEqual(30);
            expect(logger.streams).toEqual(jasmine.any(Array));
            expect(logger.streams.length).toEqual(1);
            expect(logger.streams[0].stream).toEqual(process.stdout);
        });

        it("should be able to specify log level when requesting logger", function(){
            var logger = babe.getLogger("requestLogger", "error");
            expect(logger.fields.name).toEqual('requestLogger');
            expect(logger.level()).toEqual(50);
            expect(logger.streams).toEqual(jasmine.any(Array));
            expect(logger.streams.length).toEqual(1);
            expect(logger.streams[0].stream).toEqual(process.stdout);
        });


//        it("should not change configured level when specifying level in getLogger()", function(){
//            babe.setLogLevel("trace", "auditLogger");
//
//            var logger = babe.getLogger("auditLogger", "debug");
//            expect(logger.fields.name).toEqual('auditLogger');
//            expect(logger.level()).toEqual(20);
//            expect(logger.streams).toEqual(jasmine.any(Array));
//            expect(logger.streams.length).toEqual(1);
//            expect(logger.streams[0].stream).toEqual(process.stdout);
//
//            var logger2 = babe.getLogger("auditLogger");
//            expect(logger2.fields.name).toEqual('auditLogger');
//            expect(logger2.level()).toEqual(10);
//            expect(logger2.streams).toEqual(jasmine.any(Array));
//            expect(logger2.streams.length).toEqual(1);
//            expect(logger2.streams[0].stream).toEqual(process.stdout);
//        });

        xit("should fail if invalid level is specified", function(){
            throw new Error("Not implemented");
        });

        xit("should be able to add named stream", function(){
            throw new Error("Not implemented");
        });

        xit("should get logger with named stream", function(){
            throw new Error("Not implemented");
        });

        xit("should get logger by passing level and raw stream", function(){
            throw new Error("Not implemented");
        });

        xit("should be able ot reset default log level", function(){
            throw new Error("Not implemented");
        });

        xit("should be able to reset default stream", function(){
            throw new Error("Not implemented");
        });

        xit("should be able to specify multiple streams", function(){
            throw new Error("Not implemented");
        });

        xit("should override log level with LOG_LEVEL environment variable", function(){
            throw new Error("Not implemented");
        });

        xit("should override log level with LOG_LEVEL_loggername environment variable", function(){
            throw new Error("Not implemented");
        });

        xit("should override LOG_LEVEL environment variable with LOG_LEVEL_loggername environment variable", function(){
            throw new Error("Not implemented");
        });

        xit("should be able to change specified loggers log level", function(){
            throw new Error("Not implemented");
        });

        xit("should be able to change log level for all loggers", function(){
            throw new Error("Not implemented");
        });

        xit("should child logger should respect parent's log level", function(){
            throw new Error("Not implemented");
        });

        xit("should get list of current active and defined loggers", function(){
            throw new Error("Not implemented");
        });

        xit("TEST", function(){
            throw new Error("Not implemented");
        });


    });

});
