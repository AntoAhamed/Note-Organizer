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

const notesSchema = new mongoose.Schema({
    date: String,
    time: String,
    title: String,
    description: String,
    category: String,
    email: String
});

const USERS = mongoose.model('users', usersSchema);
const NOTES = mongoose.model('notes', notesSchema); //DB connections ends here

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

var tmpUser;

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    tmpUser = email;

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

app.post('/add_note', async (req, res) => {

    const { title, description, category, email } = req.body;

    const date = new Date();

    //const check = await USER.findOne({ email: email });

    //const newBalance = Number(check.balance) - Number(cost);

    const data = {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        title: title,
        description: description,
        category: category,
        email: email
    }

    try {
        await NOTES.insertMany([data]);
        //await USER.updateOne({ email: email }, { $set: { balance: newBalance } });
        res.json("success");
    }
    catch (e) {
        console.log(e);
    }

})

app.get('/get_user', async (req, res) => {
    try {
        const userData = await USERS.findOne({ email: tmpUser });
        res.send({ user: userData });
    }
    catch (e) {
        console.log(e)
    }
})

app.get('/get_notes', async (req, res) => {
    try {
        const notes = await NOTES.find({ email: tmpUser });
        res.send({ data: notes });
    }
    catch (e) {
        console.log(e)
    }
})

app.post('/edit_note', async (req, res) => {

    const { title, description, category, _id } = req.body;

    const date = new Date();

    try {
        await NOTES.updateOne({ _id: _id }, { $set: { title: title, description: description, category: category, date: date.toLocaleDateString(), time: date.toLocaleTimeString() } });
        res.json("success");
    }
    catch (e) {
        console.log(e);
    }

})

app.post('/delete_note', async (req, res) => {

    const { _id } = req.body;

    try {
        await NOTES.deleteMany({ _id: _id });
        res.json("success");
    }
    catch (e) {
        console.log(e);
    }

})



//START THE SERVER
app.listen(port, () => {
    console.log(`Our app listening on port ${port}`)
})