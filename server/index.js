const PORT = process.env.PORT || 5000;
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const passport = require('passport');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({ origin: ['http://localhost:8080'], }))

app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);

const db = 'mongodb+srv://metepeter:zyefsOKA9llCknPK@board-cluster.2nysk.azure.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db)
    .then(() => {
        console.log(`Database connected successfully ${db}`)
    }).catch(err => {
        console.log(`Unable to connect with the database ${err}`)
    });

const usersManager = require('./routes/usersManager');
app.use('/usersManager', usersManager);
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})