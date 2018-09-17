function onUserSubscribed(subscription, subscribeInputEl, subscriptionInfoEl) {    
    if(subscription) {
        subscriptionInfoEl.textContent = JSON.stringify(subscription, null, 4);
    } else {
        subscriptionInfoEl.textContent = '';
        subscribeInputEl.checked = false;
        updateSubscribeInputAccess(subscribeInputEl);
    }
}

function onUserUnsubscribed(subscriptionInfoEl) {    
    subscriptionInfoEl.textContent = '';
}

function updateSubscribeInputAccess(subscribeInputEl) {
    if(Notification.permission === 'denied') {
        subscribeInputEl.setAttribute('disabled', 'disabled');
    } else {
        subscribeInputEl.removeAttribute('disabled');
    }
}

function subscribeInterface(subscribeManager) {
    const subscriptionInfoEl = document.getElementById('subscriptionInfo');

    const subscribeInputEl = document.getElementById('subscribeInput');

    updateSubscribeInputAccess(subscribeInputEl);

    subscribeInputEl.addEventListener('change', e => {
        if(subscribeInputEl.checked) {
            subscribeManager.subscribeUser()
                .then(subscription => onUserSubscribed(subscription, subscribeInputEl, subscriptionInfoEl));
        } else {
            subscribeManager.unsubscribeUser()
                .then(() => onUserUnsubscribed(subscriptionInfoEl));
        }
    });
}

export default subscribeInterface;