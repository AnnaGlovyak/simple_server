const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


var banks = [
    {
        id : 1,
        specialId : 'f3WUPraDsyd4lu0NyAM2',
        'bank name' : 'monobank',
        'interest rate' : 0.08,
        'loan term' : 120,
        'maximum loan' : 5000000,
        'minimum down payment' : 20000
    },
    {
        id : 2,
        specialId : 'qc00nSKchLibX8Q87y5p',
        'bank name' : 'sberbank',
        'interest rate' : 0.09,
        'loan term' : 180,
        'maximum loan' : 10000000,
        'minimum down payment' : 15000
    },
    {
        id : 3,
        specialId : 'xHSJxaDHm4sQYW5Celm7',
        'bank name' : 'privat',
        'interest rate' : 0.085,
        'loan term' : 240,
        'maximum loan' : 4000000,
        'minimum down payment' : 20000
    }
]


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    req.headers['Content-Type'] = "application/json";
    next();
});
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/banks', (req, res) => {
    res.send(banks);
})

app.get('/banks/:id', (req, res) => {
    const bank = banks.find(bank => bank.id === Number(req.params.id));
    res.send(bank);
})

app.post('/banks', (req, res) => {
    const bank = {
        id : Date.now(),
        name : req.body.name
    }
    banks.push(bank);
    res.send(bank);
})

app.put('/banks/:id', (req, res) => {
    const bank = banks.find(bank => bank.id === Number(req.params.id));
    bank.name = req.body.name;
    res.sendStatus(200);
})

app.delete('/banks/:id', (req, res) => {
    banks = banks.filter( function (bank) {
        return bank.id !== Number(req.params.id);
    });
    res.sendStatus(200);
})




app.listen(3333, () => {
    console.log('Application listening on port 3333');
});