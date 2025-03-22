const express = require('express')
const app = express()
const cors = require("cors");

//UOs170L2hqKloes4

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware
app.use(express.json());
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}));

//routes
const glassRoutes = require('./routes/glass.route');
const orderRoutes = require("./routes/order.route");

app.use("/api/glasses",glassRoutes)
app.use("/api/orders", orderRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use("/", (req, res) => {
     res.send("Optical shop server is running!");
  });
  }

  main().then(()=>console.log("Mongodb Connected Successfully")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})