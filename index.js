const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const app = express();
var db;


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
    db.collection('banks').find().toArray(function(err, docs){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
})

app.get('/banks/:id', (req, res) => {
    db.collection('banks').findOne({ _id: ObjectId(req.params.id) }, function(err, doc){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
})

app.post('/banks', (req, res) => {
    const bank = {
        name : req.body.name
    }
    db.collection('banks').insert(bank, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(500); 
        }
        res.send(bank);
    })
})

app.put('/banks/:id', (req, res) => {
    db.collection('banks').updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: { name: req.body.name } },
        function(err, result) {
            if (err){
                console.log(err);
                return res.sendStatus(500)
            }
            res.sendStatus(200);
        }
    )
})

app.delete('/banks/:id', (req, res) => {
    db.collection('banks').deleteOne(
        { _id: ObjectId(req.params.id) },
        function(err, result){
            if (err){
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
})






MongoClient.connect('mongodb://localhost:27017', function(err, client){
    if(err) {
        console.log(err)
    };
    db = client.db('banks');
    app.listen(3333, () => {
        console.log('Application listening on port 3333');
    });
})