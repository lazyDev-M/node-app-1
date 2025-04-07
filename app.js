const express = require('express')

const app = express();

const notesRoute = require('./routes/notes')
const auth = require('./routes/auth')
const mongoose = require('mongoose')

const PORT = 5000


app.use(express.json())



app.get('/',(req,res) =>{
    res.send('Welcome to Notes app')
})

app.use('/notes',notesRoute )
app.use('/', auth)

mongoose.connect('mongodb://localhost:27017/')
.then(()=> console.log('connection to mongodb successfull'))
.catch(() => console.log('connetion to mongodb unsuccessfull'))


app.listen(PORT,() =>{
    console.log(`app running on localhost:${PORT}`);
    
})