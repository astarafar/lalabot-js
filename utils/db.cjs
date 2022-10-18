const { MongoClient } = require("mongodb");
const config = require("config");
const { ModalSubmitFields } = require("discord.js");

const uri = `mongodb+srv://${config.get("db.user")}:${config.get(
  "db.password"
)}@${config.get("db.host")}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db = client.db(config.get("db.database"));

module.exports = {
  createEvent: (
    eventId,
    partyMax,
    partyTanks,
    partyHealers,
    partyDPS,
    partyOpen
  ) => {
    events = db.collection("events");

    signupDoc = {
      eventId: eventId,
      max: partyMax,
      tanks: partyTanks,
      healers: partyHealers,
      dps: partyDPS,
      open: partyOpen,
    };

    const result = events.insertOne(signupDoc);

    return result;
  },
};
