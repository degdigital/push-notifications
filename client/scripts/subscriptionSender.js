const storageKey = 'clientId';
const endpointUrl = 'http://localhost:3001/subscription/{clientId}';

function generateClientId() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function getClientId() {
    try {
        let clientId = window.localStorage.getItem(storageKey);
        if(clientId === null) {
            clientId = generateClientId();
            window.localStorage.setItem(storageKey, clientId);
        }
        return clientId;
    } catch(e) {
        console.warn('Local storage not supported', e);
    }

    return generateClientId();
}

function sendSubscription(subscription) {
    const clientId = getClientId();

    const populatedEndpointUrl = endpointUrl.replace('{clientId}', clientId);

    return fetch(populatedEndpointUrl, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
    })
    .then(response => {
        console.log(response)
        return true;
    });

}

export { sendSubscription };