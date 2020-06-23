import React from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import faker from "faker";

import { Chat } from "./components/Chat";

import "./App.css";

const uuid = faker.name.firstName();
/**
 * Initializing pubnub with a publish and a subscribe key you can get from the PubNub admin panel,
 * once you login and create a new "keyset". You should also give a unique "uuid" to the constructor
 * which is used to identify the connected clients.
 */
const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
  uuid,
});

/**
 * Here, I am wrapping the Chat component within a PubNubProvider, which will make the pubnub instance
 * visible to the child components via React Context.
 */
export const App = () => {
  return (
    <PubNubProvider client={pubnub}>
      <Chat uuid={uuid} />
    </PubNubProvider>
  );
};
