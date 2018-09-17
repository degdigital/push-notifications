# Push Notifications Playground
This repository is a playground for experimenting with the Push and Notification Web APIs. It consists of the following:
- a __web client__ for subscribing to, receiving and displaying push notifications
- an __application server__ for storing subscriptions and sending push messages

## Web Client 
The web client provides a simple interface for a user to subscribe to push notifications. When the user grants permission to accept push notifications, a push subscription is created and sent to the application server (via an API endpoint). The web client also registers a service worker that listens for incoming push messages and displays them via the [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API).

To install the web client, run `npm install` from the `client` directory in a terminal. Then, run `npm start` to fire up the [Express](https://expressjs.com/) web server. The web client can be accessed at [http://localhost:3000](http://localhost:3000).

## Application Server
The application server is reponsible for managing a list of client push subscriptions and sending push messages to clients via those subscriptions.

Web clients send their push subscriptions to the application server via an exposed API endpoint at [http://localhost:3001/subscription/{clientId}](http://localhost:3001/subscription/{clientId}). The `{clientId}` portion of the endpoint corresponds to a unique identifier managed by each client.

To install the application server, run `npm install` from the `server` directory in a terminal. Then, run `npm start` to fire up the [Express](https://expressjs.com/) web server. 

To send out a push message to subscribed clients, run `npm run push`.