import tap from "tap";
import { createChannels } from "./channels.js";

tap.test("send event from source to sink", (t) => {
  const { createSink, source } = createChannels();

  const sink = createSink();

  source.on("source-trail", (msg) => {
    t.equal(msg, "validate source");
  });

  sink.on("sink-trail", (msg) => {
    t.equal(msg, "validate sink");
    t.end();
  });

  sink.emit("source-trail", "validate source");
  source.emit("sink-trail", "validate sink");
});

tap.test("send events from source to different sinks", (t) => {
  const { createSink, source, sendToSink } = createChannels();

  const sink1 = createSink();
  const sink2 = createSink();

  sink1.on("sink-trail", (msg) => {
    t.equal(msg, "validate sink 1");
  });

  sink2.on("sink-trail", (msg) => {
    t.equal(msg, "validate sink 2");
    t.end();
  });

  sendToSink((channels, send) => {
    const first = channels[0];
    const second = channels[1];

    send(first, "sink-trail", "validate sink 1");
    send(second, "sink-trail", "validate sink 2");
  });
});
