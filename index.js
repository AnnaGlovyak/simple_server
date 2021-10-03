const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({message: 'Hello www!'});
});







app.listen(3333, () => {
    console.log('Application listening on port 3333');
});