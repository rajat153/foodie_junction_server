const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3400;

app.set('trust proxy', 1)
app.use('/api', require('./routes'))
app.use(cors());








app.listen(PORT, ()=>{
    console.log("Server is runnning")
})
