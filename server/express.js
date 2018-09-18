const express = require('express');
const app = express();
const subscriptionManager = require('./subscriptionManager');
const webpush = require('web-push');
const clientSubscriptions = require('./clientSubscriptions.json');

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,PUT,POST');
    next();
});

app.options('/subscription/:clientId', function(req, res) {
    res.statusCode = 200;
    return res.send();
});

app.options('/push/FZzum9A2lWVFl2jEUH1ZSOTsPYvknxIqB0uX', function(req, res) {
    res.statusCode = 200;
    return res.send();
});

app.put('/subscription/:clientId', function(req, res) {
    subscriptionManager.addClientSubscription(req.params.clientId, req.body)
        .then(result => {
            res.statusCode = result ? 201 : 500;
            return res.send();
        });
});

app.post('/push/FZzum9A2lWVFl2jEUH1ZSOTsPYvknxIqB0uX', function(req, res) {
    console.log(req.body);
    var payloadBuffer = Buffer.from(JSON.stringify(req.body));
    const options = {
        vapidDetails: {
            subject: 'mailto:rheap@degdigital.com',
            publicKey: 'BF-nw-iRfSC3avyL8Xuc3vA_VBEkLcDUuGsxo6yOOBwdNMnf0KusoUiYnsUTp3JlfKHWzFSBwR3ZvXcj0ypBcp0',
            privateKey: 'bVYlg8mReDo3ZvOAGvVMmHQ-yhBEQbuHTeE3zyOzyuY'
        },
        TTL: 1800,
        headers: {
        },
        contentEncoding: '',
        proxy: ''
    }

    const promises = clientSubscriptions.map(clientSubscription => {
        return webpush.sendNotification(clientSubscription.subscription, payloadBuffer, options)
            .then(() => true)
            .catch(error => {
                console.log('ERROR: ', error);
                return false;
            });
    });

    Promise.all(promises)
        .then(results => {
            const successes = results.filter(result => result); 
            console.log(`${successes.length} message(s) pushed`);
        })
        .then(() => {
            res.statusCode = 201;
            return res.send();
        });
});

app.listen(3001, () => console.log('Push Notifications Server running on port 3001'));