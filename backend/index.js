const express = require('express')
const app = express()
const cors = require("cors");

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware
app.use(express.json());
app.use(cors({
    origin:['http://localhost:5181'],
    credentials:true
}))

//routes
const glassRoutes = require('./src/glasses/glass.route')
app.use("/api/glasses",glassRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URL);
    //routes
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  }

  main().then(()=>console.log("Mongodb Connected Successfully")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})