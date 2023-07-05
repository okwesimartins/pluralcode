const express= require("express");
const dotenv= require("dotenv");
const cors = require("cors");

const enrolRoutes = require("./routes/enrolroutes");

const app = express();

const db = require("./models");

app.use(express.json());
app.use(cors());
dotenv.config();


db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/api", enrolRoutes);

// app.get("/test", (req, res, next)=>{
//     return res.json({message: "hello"});
// });



app.listen(5000);
  