const express = require("express"),
  app = express(),
  port = process.env.PORT || 3001;
const jsonParser = require("body-parser").json();
const Sequelize = require("sequelize");
const DB_ADMIN_NAME = process.env.DB_ADMIN_NAME || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "my-secret-pw";

const sequelize = new Sequelize("facturas", DB_ADMIN_NAME, DB_PASSWORD, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: { maxConnections: 5, maxIdleTime: 30 },
  language: "en",
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    rfc: {
      type: Sequelize.STRING
    }
  },
  {
    underscored: true,
    freezeTableName: true,
    tableName: "user"
  }
);

const Receipt = sequelize.define(
  "receipt",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    emitter: {
      type: Sequelize.STRING
    },
    receiver: {
      type: Sequelize.STRING
    },
    created_at: Sequelize.TIME,
    created_at: Sequelize.TIME,
    total: Sequelize.DOUBLE
  },
  {
    underscored: true,
    freezeTableName: true,
    tableName: "receipt"
  }
);

Receipt.belongsTo(User, { as: "emitter_details", foreignKey: "emitter" });
Receipt.belongsTo(User, {
  as: "receiver_details",
  foreignKey: "receiver"
});

app.listen(port);

// Enable cors so that we can call the api from the React UI

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  res.send("Backend is Alive");
});

app.get("/customers", async function(req, res) {
  const results = (await User.findAll({})).map(logEntry => {
    return logEntry;
  });
  res.json(results);
});

app.get("/receipts", async function(req, res) {
  const results = (await Receipt.findAll({
    include: [
      {
        model: User,
        as: "receiver_details"
      },
      {
        model: User,
        as: "emitter_details"
      }
    ]
  })).map(receipt => {
    return receipt;
  });
  res.json(await results);
});

console.log("API Server started on " + port);
