const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.listen(3000, () => console.log('Push Notifications Client running on port 3000'));