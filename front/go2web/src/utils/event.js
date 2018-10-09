class Event {
  constructor() {
    this.handlers = {};
  }

  on(eventName, handler) {
    if(!(eventName in this.handlers)) {
      this.handlers[eventName] = handler;
    }
  }

  emit(eventName) {
    const handlerArgs = Array.prototype.slice.call(arguments,1);
    if (handlerArgs.length == 0) {
      this.handlers[eventName](...handlerArgs);
    } else {
      this.handlers[eventName](...handlerArgs);
    }
  }

  off(eventName) {
    if(eventName in this.handlers) {
      delete this.handlers[eventName];
    }
  }
} 

const MyEvent = new Event();
export default MyEvent;