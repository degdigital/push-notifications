const applicationServerKey = 'BF-nw-iRfSC3avyL8Xuc3vA_VBEkLcDUuGsxo6yOOBwdNMnf0KusoUiYnsUTp3JlfKHWzFSBwR3ZvXcj0ypBcp0';

self.addEventListener('push', e => {
    const messageData = e.data.json();

    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${messageData}"`);
  
    const title = 'Push Notifications Playground';
    const options = {
        body: messageData.message,
        icon: 'images/icon.png',
        badge: 'images/badge.png',
        data: messageData,
        actions: [
            {action: 'view', title: 'View video'},
            {action: 'close', title: 'Close'},
        ]
    };
  
    e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(e) {
    if (e.action === 'close') {
        notification.close();
    } else {
        const {type, id} = e.notification.data;
        switch(type) {
            case 'video':
                const url = `http://localhost:3000/video.html?id=${id}`;
                clients.openWindow(url);
                break;
        } 
    }

    notification.close();
});