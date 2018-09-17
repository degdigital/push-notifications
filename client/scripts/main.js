import subscribeManager from './subscribeManager.js';
import subscribeInterface from './subscribeInterface.js';

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        console.log('Service Workers supported');
      
        return navigator.serviceWorker.register('sw.js')
            .then(function(swReg) {
                console.log('Service Worker is registered', swReg);        
                return swReg;
            })
            .catch(function(error) {
                console.error('Service Worker Error', error);
                return null;
            });
    } else {
        console.warn('Service Workers not supported');
        return Promise.reject(null);
    }
}

function arePushNotificationsSupported() {
    return ('PushManager' in window) && ('Notification' in window);
}

function init() {
    registerServiceWorker()
        .then(swReg => {
            if(swReg) {
                if(arePushNotificationsSupported()) {
                    const subscribeManagerInst = subscribeManager(swReg);
                    subscribeInterface(subscribeManagerInst);
                } else {
                    console.warn('Push not supported')
                }
            }
        })
        .catch(() => {});
}

export default init();