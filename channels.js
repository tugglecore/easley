export function createChannels() {
  const sinks = new Map();

  const createSink = () => {
    const reference = {};
    sinks.set(reference, new Map());
    return {
      on(key, listener) {
        const sink = sinks.get(reference);
        if (sink.has(key)) {
          sink.get(key).push(listener);
        } else {
          sink.set(key, [listener]);
        }
      },
      emit(key, ...args) {
        const sink = sinks.get(reference);
        const channels = sink.get(key);
        if (Array.isArray(channels)) {
          channels.forEach((channel) => {
            channel(...args);
          });
        }
      },
    };
  };

  const send = (id, event, ...args) => {
    const sink = sinks.get(id);
    const listeners = sink.get(event);
    listeners.forEach((listener) => {
      listener(...args);
    });
  };

  const sendToSink = (cb) => {
    cb([...sinks.keys()], send);
  };

  const events = new Map();

  return {
    createSink,
    sendToSink,
    source: {
      on(key, listener) {
        if (events.has(key)) {
          events.get(key).push(listener);
        } else {
          events.set(key, [listener]);
        }
      },
      emit(key, ...args) {
        sinks.forEach((sink) => {
          const listeners = sink.get(key);
          listeners.forEach((listener) => {
            listener(...args);
          });
        });
      },
    },
  };
}
