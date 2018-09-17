const applicationServerKey = 'BF-nw-iRfSC3avyL8Xuc3vA_VBEkLcDUuGsxo6yOOBwdNMnf0KusoUiYnsUTp3JlfKHWzFSBwR3ZvXcj0ypBcp0';

self.addEventListener('push', e => {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${e.data.text()}"`);
  
    const title = 'Push Notifications Playground';
    const options = {
      body: e.data.text(),
      icon: 'images/icon.png',
      badge: 'images/badge.png'
    };
  
    e.waitUntil(self.registration.showNotification(title, options));
  });