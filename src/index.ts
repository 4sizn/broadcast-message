import client from "./client";

client.subscribe();
client.publish("/", { payload: "asdf" });

global.client = client;
