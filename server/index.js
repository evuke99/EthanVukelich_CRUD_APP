require("dotenv").config();

//.env variables used for db URI and PORT
const PORT = process.env.PORT;
const ATLAS_URI = process.env.ATLAS_URI;

const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const UserModel = require("./Models/Users");

//sets options for the client/api
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

//runs server connection and db connection
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose
      .connect(ATLAS_URI, clientOptions)
      .then(() => {
        // start the Express server only if the db connects
        app.listen(PORT, () => {
          console.log(`Connected to db and server listening on port ${PORT}`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // pings the db to ensure proper connection
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err);
  }
}
run().catch(console.dir);

// general POST request for testing
app.post("/", async (req, res) => {
  const { FirstName } = req.body;
  try {
    const user = await UserModel.create({
      FirstName: FirstName,
    });
    res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

// genearl GET request for testing
app.get("/getUsers", async (req, res) => {
  UserModel.find().then((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
