const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb+srv://anusuya:admin1234@cluster0.e8pdt.mongodb.net/shop?retryWrites=true&w=majority'
        )
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        // console.log(client)
        // console.log(_db);
        
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

