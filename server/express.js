const express = require('express');
const app = express();
const subscriptionManager = require('./subscriptionManager');

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT');
    next();
});

app.put('/subscription/:clientId', function(req, res) {
    subscriptionManager.addClientSubscription(req.params.clientId, req.body)
        .then(result => {
            res.statusCode = result ? 201 : 500;
            return res.send();
        });
});

app.listen(3001, () => console.log('Push Notifications Server running on port 3001'));