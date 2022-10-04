const { MongoClient } = require("mongodb");
const config = require("config");

const uri = `mongodb+srv://${config.get("db.user")}:${config.get(
  "db.password"
)}@${config.get("db.host")}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
