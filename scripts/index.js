require("dotenv").config();
const mongodb = require("mongodb").MongoClient;

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const burnExpiredTokens = require("./services/burn-expired-tokens");

// const initDatabase = () => {
//     mongodb.connect(process.env.MONGO_DB_CONNECTION, { useNewUrlParser: true,  }, async (error, client) =>  {
//         if (error) console.log(error);
//         const db = client.db('warranties') //client.db('warranties.active_warranties');
//         const results = await db.collection("active_warranties").find().toArray()
//         console.log(results);
//         client.close();
//     });
// }

mongoose.connect(process.env.MONGO_DB_CONNECTION, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("Connected to DB...");
});

const app = express();
app.use(morgan());
app.use(express.json());
app.use(cors());

const createWarrantiesRouter = require("./routers/create-warranty");
const burnWarrantiesRouter = require("./routers/burn-expired-warranty");
const viewWarrantiesRouter = require("./routers/view-warranty");

app.use("/createWarrantyToken", createWarrantiesRouter);
app.use("/deleteExpiredTokens", burnWarrantiesRouter);
app.use("/viewWarrantyTokens", viewWarrantiesRouter);

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Server has started on port ${process.env.PORT_NUMBER}`);
    setInterval(async () => {
      // console.log('Starting Execution');
      // setTimeout(() => console.log('Operation done'), 2000);
      burnExpiredTokens();
    }, 1000);
});
