const express = require('express');
const connection = require('./db');
const UserRouter = require('./Route/user.route');
const cors = require('cors');
const TaskRouter = require('./Route/task.route');
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", UserRouter);
app.use("/task", TaskRouter);
app.use('/images',express.static('images'))

app.listen(3000, async () => {
    try { 
        await connection;
        console.log("Connected")
    }
    catch (err) {
        console.log(err.message)
    }
    console.log("running");
})