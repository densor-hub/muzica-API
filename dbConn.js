const { MongoClient } = require("mongodb");
require("dotenv")?.config();

const localCluster = `${process?.env?.DATABASE_URL}`;
const onlineCluster = `${process?.env?.DATABASE_URL}`;

let dbConnection;
module.exports = {
  connectToDb: (callBack) => {
    try {
      MongoClient.connect(onlineCluster).then((client) => {
        dbConnection = client.db();
        console.log("connected to database");
        return callBack();
      });
    } catch (err) {
      console.log(err);
      return callBack(err);
    }
  },

  getDb: () => {
    return dbConnection;
  },
};
