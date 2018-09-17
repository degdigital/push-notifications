import { urlB64ToUint8Array } from './utils.js';
import { sendSubscription } from './subscriptionSender.js';

const applicationServerKey = 'BF-nw-iRfSC3avyL8Xuc3vA_VBEkLcDUuGsxo6yOOBwdNMnf0KusoUiYnsUTp3JlfKHWzFSBwR3ZvXcj0ypBcp0';

function subscribeUser(swRegistration) {
    const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(applicationServerKey)
    };

    return swRegistration.pushManager.subscribe(subscribeOptions)
        .then(subscription => {
            return sendSubscription(subscription)
                .then(() => {
                    console.log('User is subscribed');
                    return subscription;
                });
        })
        .catch(err => {
            console.log('Failed to subscribe the user: ', err);
            return null;
        });
}

function unsubscribeUser(swRegistration) {
    return swRegistration.pushManager.getSubscription()
        .then((subscription) => {
            if (subscription) {
                return subscription.unsubscribe();
            }
        })
        .catch(error => {
            console.log('Error unsubscribing', error);
            return false;
        })
        .then(() => {
            console.log('User is unsubscribed.');
            return true;
        });
}

function areNotificationsAllowed() {
    return Notification.permission !== 'denied';
}

function subscriber(swRegistration) {
    
    return {
        subscribeUser: () => subscribeUser(swRegistration),
        unsubscribeUser: () => unsubscribeUser(swRegistration),
        areNotificationsAllowed
    }
}

export default subscriber;