const util = require('util');
const Emitter = require('events');
function myLogger() {
  Emitter.call(this);
}
util.inherits(myLogger, Emitter);

//searched for ES6 approach when I found that inherits is deprecated
const EventEmitter = require('events');

class MyStream extends EventEmitter {
  write(data) {
    this.emit('data', data);
  }
}

module.exports = {
    myLogger: myLogger,
    MyStream: MyStream
}
