const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/posts', require('./routes/posts.routes.js'));
app.use('/api/collections', require('./routes/collections.routes.js'));
app.use('/api/hobies', require('./routes/hobies.routes.js'));

mongoose.connect(process.env.MONGODB_URI ||'mongodb+srv://Artem:aaa123@cluster0.qj5z6.mongodb.net/fhobies?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=>{
    console.log('Conected to database.');
})

app.listen(1337, ()=>console.log('Server started on port 1337'));



