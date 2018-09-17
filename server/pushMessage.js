const webpush = require('web-push');
const clientSubscriptions = require('./clientSubscriptions.json');
 
const payload = 'You just got pushed!';
   
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
    return webpush.sendNotification(clientSubscription.subscription, payload, options)
      .then(() => true)
      .catch(error => {
        console.log('ERROR: ', error);
        return false;
      });
});

Promise.all(promises)
  .then(results => {
    const successes = results.filter(result => result); 
    console.log(`${successes.length} message(s) pushed`)
  });
 
