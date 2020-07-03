let webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BAs4rT7xGjFfwUV716dgdb5EAIo4L4414gsC7nAIi2HJpwSirSEMQDf3JdwiBWRCI7kVrCdS871_AAzFDTXJ7zg",
    "privateKey": "50hMwu7CrwsZ5EjO7u3kZmBQVm-WXE-l2XGP4zXH8LM"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cyyMRCw39eU:APA91bEltF5ZtnsP1ikCAH7wUVklKw6nCpoS0mqZeCWLaX2Lt9CjiYcUNLedfAc5oViYyY6QN4CG9FLn-3a5PeDVYIYAoAQxY_W1i-XnlZ_D4TMCD70A9CB1RV2Tc-fSr6DEOOQrg5N6",
    "keys": {
        "p256dh": "BPT23N09qXU3snuX2ICTmVaTnW5jnxroTPdZCcMhr2TJjr8xaISgJ2Ys1oHydpy8A+PJ/xCIW0Tgqi+IzWt9LlQ=",
        "auth": "/Wu4K9alrlzYlR1CIBw3ww=="
    }
};
let payload = 'Hallo! Aplikasi Real Madrid telah mendapatkan update terbaru!';

let options = {
    gcmAPIKey: '610371441073',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);