require("dotenv").config();

//.env variables used for db URI and PORT
const PORT = process.env.PORT;
const ATLAS_URI = process.env.ATLAS_URI;

const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const UserModel = require("./Models/Users");
const userRoutes = require("./Routes/Users");

///////////////////////
// Routes
///////////////////////
app.use("/api/users", userRoutes);

///////////////////////
// Middleware
///////////////////////
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

///////////////////////
// Server and db setup
///////////////////////

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
