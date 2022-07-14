const express = require('express')
const app = express()
const connectDB = require('./db/mongo')
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
connectDB();
app.get('/', (req, res) => {
    res.send('Server Started')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
