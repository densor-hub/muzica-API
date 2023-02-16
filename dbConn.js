const { MongoClient } = require('mongodb');
require('dotenv')?.config();


const localCluster = `${process?.env?.MONGO_LOCAL}`;
const onlineClusetr = `${process?.env?.MONGO_CLOUD}`

let dbConnection;
module.exports = {
    connectToDb: ((callBack) => {
        try {
            MongoClient.connect(localCluster)
                .then((client) => {
                    dbConnection = client.db();
                    console.log('connected to database')
                    return callBack();
                })
        }
        catch (err) {
            console.log(err)
            return callBack(err);
        }
    }),

    getDb: (() => { return dbConnection })
}