# Vincit Talks Chat

A demo chat application created for Vincit Talks on 6/25. Created with [PubNub](https://www.pubnub.com/)

Demo available at [https://vincit-talks-chat.netlify.app](https://vincit-talks-chat.netlify.app)

### Running locally

To run the app locally, you'll need a PubNub account and a keyset with a publish & subscribe keys.
Create one at [https://www.pubnub.com/](https://www.pubnub.com/).

- `npm/yarn install`
- Copy `.env.example` to a `.env` file and add your publish & subscribe keys from PubNub admin panel there as well as a channel name you'd like to use for the chat (all the messages are sent to this channel).
- `yarn/npm start` to start chatting!
