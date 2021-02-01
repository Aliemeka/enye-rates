const express = require('express')
const routes = require('./src/routes/routes')
const app = express()


const port = process.env.PORT || 9000;


app.use(express.json())
app.use('/', routes)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})