const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const port = 8000

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

main().catch(err => console.log(err)); //DB connections starts from here

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/note-organizer');
    console.log("Connection build successfully");
}

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const USERS = mongoose.model('users', usersSchema); //DB connections ends here

app.get('/', cors(), function (req, res) {

})

app.post('/signup', async (req, res) => {

    const { name, email, password } = req.body;

    const data = {
        name: name,
        email: email,
        password: password
    }

    const check = await USERS.findOne(data);

    try {
        if (check) {
            res.json("failed");
        }
        else {
            await USERS.insertMany([data]);
            res.json("success");
        }
    }
    catch (e) {
        console.log(e);
    }

})

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const data = {
        email: email,
        password: password
    }

    const check = await USERS.findOne(data);

    try {
        if (check) {
            res.json("success");
        }
        else {
            res.json("failed");
        }
    }
    catch (e) {
        console.log(e);
    }

})



//START THE SERVER
app.listen(port, () => {
    console.log(`Our app listening on port ${port}`)
})