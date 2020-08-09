import EventEmitter from "eventemitter3";

type Message = {
  eventName?: "";
  payload: any;
};

type Listener = (...args: any[]) => void;

class Client {
  _subscriptions: {
    [x: string]: any;
  };

  _emitter: EventEmitter<string | symbol, any>;

  constructor() {
    this._subscriptions = {};
    this._emitter = new EventEmitter();
  }

  subscribe(topic = "/") {
    if (this._subscriptions[topic]) {
      return this._subscriptions[topic];
    }

    this._subscriptions[topic] = new BroadcastChannel(topic);
    this._subscriptions[topic].onmessage = this._handleOnMessage.bind(this);
  }

  _handleOnMessage(args: MessageEvent) {
    console.log("_handleOnMessage", args);
    const { data } = args;
    const { eventName, payload } = data;
    this._emitter.emit(`message:${eventName}`, payload);
  }

  onMessage(eventName: string, listener: Listener) {
    this.on(`message:${eventName}`, listener);
  }

  on(eventName: string, listener: Listener) {
    this._emitter.on(eventName, listener);
  }

  once(eventName: string, listener: Listener) {
    this._emitter.once(eventName, listener);
  }

  off(eventName: string, listener: Listener) {
    this._emitter.off(eventName, listener);
  }

  isSubscrubed(topic = undefined) {
    if (topic) {
      return Object.keys(this._subscriptions[topic!]);
    } else {
      return Object.keys(this._subscriptions);
    }
  }

  send(topic = "/", message: Message) {
    console.log("send", topic, message);
    new BroadcastChannel(topic).postMessage(message);
  }

  publish(topic = "/", message: Message) {
    this.send(topic, message);
  }

  disconnect(topic = undefined) {
    if (topic) {
      console.log(topic);
      this._subscriptions[topic!].close();
      delete this._subscriptions[topic!];
    } else {
      Object.values(this._subscriptions).forEach((o) => o.close());
      this._subscriptions = {};
    }
  }
}

const cb = new Client();

export default cb;
