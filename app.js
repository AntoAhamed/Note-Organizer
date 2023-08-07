const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require("body-parser")
const multer = require('multer')
const path = require('path')
const app = express()
const { body, validationResult } = require('express-validator');
const port = 8000

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))
app.use(cors())

main().catch(err => console.log(err)); //DB connections starts from here

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/note-organizer');
    console.log("Connection build successfully");
}

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const notesSchema = new mongoose.Schema({
    date: {
        type: String,
        /*default: Date.now*/
    },
    time: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const categoriesSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    }
});

const imagesSchema = new mongoose.Schema({
    image: {
        type: String
    }
})

const USERS = mongoose.model('users', usersSchema);
const NOTES = mongoose.model('notes', notesSchema);
const CATEGORIES = mongoose.model('categories', categoriesSchema);
const IMAGES = mongoose.model('images', imagesSchema); //DB connections ends here

app.get('/', cors(), function (req, res) {

})

app.post('/signup', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 4 })
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

    const { name, email, password } = req.body;

    const userData = {
        name: name,
        email: email,
        password: password
    }

    const data = {
        email: email,
    }

    const check = await USERS.findOne(data);

    try {
        if (check) {
            res.json("failed");
        }
        else {
            await USERS.insertMany([userData]);
            res.json("success");
        }
    }
    catch (e) {
        console.log(e);
    }
})

var tmpUser;

app.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 4 })
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

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

    const data = {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        title: title,
        description: description,
        category: category,
        email: email
    }

    const categoryData = {
        category: category
    }

    const check = await CATEGORIES.findOne(categoryData);

    try {
        await NOTES.insertMany([data]);

        if (!check) {
            await CATEGORIES.insertMany([categoryData]);
        }

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

app.post('/add_category', async (req, res) => {

    const { newCategory } = req.body;

    const data = {
        category: newCategory
    }

    const check = await CATEGORIES.findOne(data);

    try {
        if (check) {
            res.json("failed");
        }
        else {
            await CATEGORIES.insertMany([data]);
            res.json("success");
        }
    }
    catch (e) {
        console.log(e);
    }

})

app.get('/get_categories', async (req, res) => {
    try {
        const categories = await CATEGORIES.find();
        res.send({ data: categories });
    }
    catch (e) {
        console.log(e)
    }
})

app.post('/searchByTitle', async (req, res) => {

    const { searchTitle } = req.body;

    const check = await NOTES.find({ title: searchTitle, email: tmpUser });

    try {
        if (check) {
            res.send({ data: check });
        }
        else {
            res.json("failed");
        }
    }
    catch (e) {
        console.log(e);
    }

})

app.post('/filterByCat', async (req, res) => {

    const { filterCat } = req.body;

    const check = await NOTES.find({ category: filterCat, email: tmpUser });

    try {
        if (check) {
            res.send({ data: check });
        }
        else {
            res.json("failed");
        }
    }
    catch (e) {
        console.log(e);
    }

})

//Image operation starts from here
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

var tmpImage;

app.post('/upload', upload.single('file'), (req, res) => {
    tmpImage = req.file.filename;
    IMAGES.create({ image: req.file.filename })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

app.post('/setImage', (req, res) => {
    const { _id } = req.body;
    NOTES.updateOne({ _id: _id }, { $set: { image: tmpImage } })
        .then(res => res.json(res))
        .catch(err => res.json(err))
}) //Image operation ends here

/*app.get('/getImage', (req, res) => {
    IMAGES.find()
        .then(images => res.json(images))
        .catch(err => res.json(err))
})*/

app.post('/delete_category', async (req, res) => {

    const { _id, category } = req.body;

    const check = await NOTES.findOne({ category: category })

    try {
        if (!check) {
            await CATEGORIES.deleteMany({ _id: _id });
            res.json("success");
        }else{
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