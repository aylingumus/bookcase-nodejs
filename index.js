require('dotenv').config()

const express = require("express")
const bodyParser = require("body-parser")
const port = process.env.PORT || 3456;
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require("./routes")(app)

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`)
});