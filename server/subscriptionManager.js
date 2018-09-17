const fse = require('fs-extra');

function getClientSubscription(clientId, clientSubscriptions) {
    return clientSubscriptions.find(clientSub => clientSub.clientId === clientId);
}

function createClientSubscription(clientId, subscription) {
    return {
        clientId,
        subscription
    };
}

function addClientSubscription(clientId, subscription) {
    const clientSubscriptions = require('./clientSubscriptions.json');

    const clientSubscription = getClientSubscription(clientId, clientSubscriptions);

    if(clientSubscription) {
        clientSubscription.subscription = subscription;
    } else {
        clientSubscriptions.push(createClientSubscription(clientId, subscription));
    }

    return fse.writeJson('./clientSubscriptions.json', clientSubscriptions, { spaces: '\t'})
        .then(() => true)
        .catch(e => {
            console.log('Error writing file', e);
            return false;
        });
}

module.exports = {
    addClientSubscription
};